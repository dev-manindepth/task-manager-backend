import { taskRoutes } from '@task/routes/task.routes';
import { Application } from 'express';

const BASE_PATH = '/api/v1';
export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, taskRoutes.routes());
  };
  routes();
};
