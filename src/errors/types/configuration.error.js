import ApiError from '../classes/api.error.js';
import ERROR_TYPES from '../constants/error.types.js';

class ConfigurationError extends ApiError {
  constructor(message = 'Configuration error occurred') {
    super(ERROR_TYPES.INTERNAL_SERVER_ERROR, message);
    this.name = 'ConfigurationError';
  }
}

export default ConfigurationError;
