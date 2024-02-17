import Logger from 'bunyan';
import { config } from '@root/config';
import { Application, NextFunction, Request, Response, json, urlencoded } from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import cookieSession from 'cookie-session';
import compression from 'compression';
import applicationRoutes from '@root/routes';
import HTTP_STATUS from 'http-status-codes';
import { CustomError, IErrorResponse } from '@shared/helpers/error-handler';

const log: Logger = config.createLogger('setupServer');
const PORT = 8000;
export class TaskManagerServer {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  public start() {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }
  private securityMiddleware(app: Application) {
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.COOKIE_SECRET_ONE!, config.COOKIE_SECRET_ONE!],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development'
      })
    );
  }
  private standardMiddleware(app: Application) {
    app.use(compression());
    app.use(json({ limit: '5mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }
  private routesMiddleware(app: Application) {
    applicationRoutes(app);
  }
  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((error: IErrorResponse | Error, _req: Request, res: Response, next: NextFunction) => {
      log.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      } else {
        return res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .json({ status: 'INTERNAL SERVER ERROR ', statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: 'Something went wrong' });
      }
    });
  }
  private startServer(app: Application) {
    app.listen(PORT, () => {
      log.info(`Server running on PORT : ${PORT}`);
    });
  }
}
