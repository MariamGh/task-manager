import ApiError from '../classes/api.error.js';
import ERROR_TYPES from '../constants/error.types.js';

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error('Unexpected error:', err);
    res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export default errorHandler;
