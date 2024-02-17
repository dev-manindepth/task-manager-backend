import { joiRequestParamsValidation } from '@global/validator/joi-validator';
import { taskService } from '@root/shared/services/db/task.service';
import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import Joi from 'joi';

export class Delete {
  @joiRequestParamsValidation(Joi.object({ id: Joi.string().required() }))
  public async task(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await taskService.deleteTask(Number(id));
      res.status(HTTP_STATUS.OK).json({ message: 'Task Deleted', data: null });
    } catch (error) {
      next(error);
    }
  }
}
