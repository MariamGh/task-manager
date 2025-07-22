import Joi from 'joi';
import { TaskStatusEnum } from '../../enums/task.status.enum.js';

export const CreateTaskDto = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid(...Object.values(TaskStatusEnum)).required(),
});
