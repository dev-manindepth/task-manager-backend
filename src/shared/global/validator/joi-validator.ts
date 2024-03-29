/* eslint-disable @typescript-eslint/no-explicit-any */
import { JoiRequestValidationError } from '@global/helpers/error-handler';
import { NextFunction, Request } from 'express';
import { ObjectSchema } from 'joi';

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void;
export function joiRequestBodyValidation(schema: ObjectSchema): IJoiDecorator {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const next: NextFunction = args[2];
      const { error } = await Promise.resolve(schema.validate(req.body));
      if (error?.details) {
        return next(new JoiRequestValidationError(error.details[0].message));
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

export function joiRequestParamsValidation(schema: ObjectSchema): IJoiDecorator {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const next: NextFunction = args[2];

      const { error } = await Promise.resolve(schema.validate(req.params));

      if (error?.details) {
        return next(new JoiRequestValidationError(error.details[0].message));
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}



// Define a decorator factory
// function ValidateReqParams(schema: Joi.Schema) {
//   return function (target: any, key: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (req: Request, res: Response, next: NextFunction) {
//       const { error } = schema.validate(req.params);
//       if (error) {
//         res.status(400).send(error.details[0].message);
//       } else {
//         originalMethod.apply(this, [req, res, next]);
//       }
//     };

//     return descriptor;
//   };
// }

// export default ValidateReqParams;
