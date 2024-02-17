import Joi from 'joi';

export const taskSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    'string.base': 'Title must be of type string'
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be of type string'
  }),
  completed: Joi.boolean().required().messages({
    'boolean.base': 'Completed must be of type boolean'
  })
});

export const updateTaskSchema = Joi.object().keys({
  completed: Joi.boolean().required().messages({
    'boolean.base': 'Completed must be of type boolean'
  })
});
