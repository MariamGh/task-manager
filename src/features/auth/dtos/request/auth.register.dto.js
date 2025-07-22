import Joi from 'joi';

export const AuthRegisterDto = Joi.object({
  username: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username must be max 30 characters',
    }),
      
  name: Joi.string()
    .trim()
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.max': 'Name must be max 50 characters',
    }),
    
  surname: Joi.string()
    .trim()
    .max(50)
    .required()
    .messages({
      'string.empty': 'Surname is required',
      'string.max': 'Surname must be max 50 characters',
    }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email address',
    }),

  phone_number: Joi.string()
    .trim()
    .min(7)
    .max(15)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.min': 'Phone number length must be between 7 and 15',
      'string.max': 'Phone number length must be between 7 and 15',
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
    }),
});
