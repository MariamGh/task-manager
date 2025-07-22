import ApiError from '../classes/api.error.js';
import ERROR_TYPES from '../constants/error.types.js';

class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(ERROR_TYPES.NOT_FOUND, message);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
