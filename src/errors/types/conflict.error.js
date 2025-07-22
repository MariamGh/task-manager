import ApiError from '../classes/api.error.js';

class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}

export default ConflictError;
