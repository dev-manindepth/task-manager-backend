import express, { Express } from 'express';
import { config } from '@root/config';
import databaseConnection from '@root/setupDatabase';
import Logger from 'bunyan';
import { TaskManagerServer } from '@root/setupServer';

const log: Logger = config.createLogger('app');
class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: TaskManagerServer = new TaskManagerServer(app);
    server.start();
    Application.handleExit();
  }

  private loadConfig(): void {
    config.validateConfig();
  }

  private static handleExit(): void {
    process.on('uncaughtException', (error: Error) => {
      log.error(`There was an uncaugh error: ${error}`);
      Application.shutdownProperly(1);
    });
    process.on('unhandledRejection', (error: Error) => {
      log.error(`Unhandled rejection at promise: ${error}`);
      Application.shutdownProperly(2);
    });
    process.on('SIGTERM', () => {
      log.error('Caught SIGTERM');
      Application.shutdownProperly(2);
    });
    process.on('SIGINT', () => {
      log.error('Caugh SIGINT');
      Application.shutdownProperly(2);
    });
    process.on('exit', () => {
      log.error('Exiting');
    });
  }
  private static shutdownProperly(exitCode: number): void {
    Promise.resolve()
      .then(() => {
        log.info('Shutdown complete');
        process.exit(exitCode);
      })
      .catch((err) => {
        log.error(`Error during shutdown: ${err}`);
        process.exit(1);
      });
  }
}
const application: Application = new Application();
application.initialize();
