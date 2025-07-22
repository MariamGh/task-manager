import { AuthLoginDto } from '../../dtos/request/auth.login.dto.js';
import AuthenticationError from '../../../../errors/types/authentication.error.js';
import ERROR_TYPES from '../../../../errors/constants/error.types.js';

export const validateLogin = (req, res, next) => {
  const { error } = AuthLoginDto.validate(req.body);
  if (error) {
    return next(new AuthenticationError(error.details[0].message, ERROR_TYPES.BAD_REQUEST));
  }
  next();
};
