import { joiRequestBodyValidation } from '@global/validator/joi-validator';
import { taskService } from '@root/shared/services/db/task.service';
import { taskSchema } from '@task/schema/task.schema';
import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
export class Create {
  @joiRequestBodyValidation(taskSchema)
  public async task(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description, completed } = req.body;
      const task =await taskService.createTask({ title, description, completed });
      res.status(HTTP_STATUS.CREATED).json({ message: 'Task Created', data: task });
    } catch (error) {
      next(error);
    }
  }
}
