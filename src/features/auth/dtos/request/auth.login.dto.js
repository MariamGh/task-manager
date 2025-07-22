import Joi from 'joi';

export const AuthLoginDto = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email address',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required',
    }),
});
