import Joi from 'joi';

export const PaginationRequestDto = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': '"page" must be a number',
    'number.integer': '"page" must be an integer',
    'number.min': '"page" must be at least 1'
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.base': '"limit" must be a number',
    'number.integer': '"limit" must be an integer',
    'number.min': '"limit" must be at least 1',
    'number.max': '"limit" cannot exceed 100'
  })
});
