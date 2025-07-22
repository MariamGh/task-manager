import {
  registerUser,
  loginUser,
  refreshTokens,
  logoutUser,
} from '../services/auth.service.js';
import SUCCESS_STATUS from '../../../errors/constants/success.status.js';

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(SUCCESS_STATUS.CREATED).json({ message: 'User registered successfully', user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const tokens = await loginUser(req.body);
    res
      .status(SUCCESS_STATUS.OK)
      .cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      })
      .json({ message: 'Login successful', accessToken: tokens.accessToken });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    const newAccessToken = await refreshTokens(refreshTokenCookie);
    res.status(SUCCESS_STATUS.OK).json({ accessToken: newAccessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    await logoutUser(refreshTokenCookie);
    res.clearCookie('refreshToken');
    res.status(SUCCESS_STATUS.OK).json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};
