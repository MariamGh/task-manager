import jwt from 'jsonwebtoken';
import AuthenticationError from '../../errors/types/authentication.error.js';
import { ERROR_TYPES } from '../../errors/constants/error.types.js';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return next(new AuthenticationError('No token provided', ERROR_TYPES.UNAUTHORIZED));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AuthenticationError('Invalid or expired token', ERROR_TYPES.FORBIDDEN));
  }
}
