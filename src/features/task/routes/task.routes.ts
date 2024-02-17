import { Create } from '@task/controllers/create-task';
import { Delete } from '@task/controllers/delete-task';
import { Get } from '@task/controllers/get-task';
import { Update } from '@task/controllers/update-task';
import { Router } from 'express';

class TaskRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/task', Create.prototype.task);
    this.router.get('/task', Get.prototype.task);
    this.router.patch('/task/:id', Update.prototype.task);
    this.router.delete('/task/:id', Delete.prototype.task);
    return this.router;
  }
}

export const taskRoutes: TaskRoutes = new TaskRoutes();
