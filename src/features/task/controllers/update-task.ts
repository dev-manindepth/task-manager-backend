import { joiRequestBodyValidation, joiRequestParamsValidation } from '@global/validator/joi-validator';
import { taskService } from '@root/shared/services/db/task.service';
import { updateTaskSchema } from '@task/schema/task.schema';
import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import Joi from 'joi';

export class Update {
  @joiRequestParamsValidation(Joi.object({ id: Joi.string().required() }))
  @joiRequestBodyValidation(updateTaskSchema)
  public async task(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { completed } = req.body;
      const updatedTask = await taskService.updateTask({ id: Number(id), completed });
      res.status(HTTP_STATUS.OK).json({ message: 'Task Updated', data: updatedTask });
    } catch (error) {
      next(error);
    }
  }
}
