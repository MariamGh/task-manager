import express from 'express';
import { register, login, refreshToken, logout } from '../controllers/auth.controller.js';
import { validateRegister } from '../middlewares/validation/validate.register.middleware.js';
import { validateLogin } from '../middlewares/validation/validate.login.middleware.js';
import { rateLimiter } from '../middlewares/security/rate.limiter.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', validateRegister, register);
AuthRouter.post('/login', rateLimiter, validateLogin, login);
AuthRouter.post('/refresh-token', refreshToken);
AuthRouter.post('/logout', logout);

export default AuthRouter;
