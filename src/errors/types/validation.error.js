import ApiError from '../classes/api.error.js';
import ERROR_TYPES from '../constants/error.types.js';

class ValidationError extends ApiError {
  constructor(message = 'Validation error') {
    super(ERROR_TYPES.BAD_REQUEST, message);
    this.name = 'ValidationError';
  }
}

export default ValidationError;
