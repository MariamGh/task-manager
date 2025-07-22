import ApiError from '../../errors/classes/api.error.js';
import ERROR_TYPES from '../../errors/constants/error.types.js';

export default function errorHandlerMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error('Unexpected Error:', err);
  res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
}
