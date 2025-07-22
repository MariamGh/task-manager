import Joi from 'joi';

export const UpdateTaskDto = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pending', 'in_progress', 'completed'),
});
