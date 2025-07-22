import ApiError from '../classes/api.error.js';
import ERROR_TYPES from '../constants/error.types.js';

class AuthenticationError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(ERROR_TYPES.UNAUTHORIZED, message);
    this.name = 'AuthenticationError';
  }
}

export default AuthenticationError;
