import ERROR_TYPES from '../constants/error.types.js';

class ApiError extends Error {
  constructor(statusCode = ERROR_TYPES.INTERNAL_SERVER_ERROR, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; 
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
