import { AuthRegisterDto } from '../../dtos/request/auth.register.dto.js';
import AuthenticationError from '../../../../errors/types/authentication.error.js';
import ERROR_TYPES from '../../../../errors/constants/error.types.js';

export const validateRegister = (req, res, next) => {
  const { error } = AuthRegisterDto.validate(req.body);
  if (error) {
    return next(new AuthenticationError(error.details[0].message, ERROR_TYPES.BAD_REQUEST));
  }
  next();
};