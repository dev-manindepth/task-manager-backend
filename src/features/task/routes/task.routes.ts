import { Router } from 'express';

class TaskRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    return this.router;
  }
}

export const taskRoutes: TaskRoutes = new TaskRoutes();
