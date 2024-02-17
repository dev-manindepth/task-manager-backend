import { taskService } from '@root/shared/services/db/task.service';
import { ITask } from '@task/interfaces/task.interface';
import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
export class Get {
  public async task(_req: Request, res: Response, next: NextFunction) {
    try {
      const tasks: ITask[] = await taskService.getAllTasks();
      res.status(HTTP_STATUS.OK).json({ message: 'All Tasks', data: tasks.length > 0 ? tasks : [] });
    } catch (error) {
      next(error);
    }
  }
}
