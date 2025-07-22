import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {
  findUserByUsernameEmailOrPhone,
  insertUser,
  findUserByEmail,
} from '../repositories/auth.repository.js';
import AuthenticationError from '../../../errors/types/authentication.error.js';
import ConfigurationError from '../../../errors/types/configuration.error.js';
import sanitizeUser from '../../../utils/sanitize/sanitize.user.js';
import ConflictError from '../../../errors/types/conflict.error.js';

const saltRounds = 10;
const refreshTokensStore = new Map();

export const generateAccessToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new ConfigurationError('JWT_SECRET is not configured');
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = (userId) => {
  const refreshToken = crypto.randomBytes(40).toString('hex');
  refreshTokensStore.set(refreshToken, userId);
  return refreshToken;
};

export const verifyRefreshToken = (token) => {
  const userId = refreshTokensStore.get(token);
  if (!userId) {
    throw new AuthenticationError('Invalid refresh token');
  }
  return userId;
};

export const revokeRefreshToken = (token) => {
  refreshTokensStore.delete(token);
};

export const registerUser = async ({ username, name, surname, email, phone_number, password }) => {
  const existing = await findUserByUsernameEmailOrPhone(username, email, phone_number);
  if (existing.length > 0) {
    throw new ConflictError('Email or phone number already in use');
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const userId = await insertUser(username, name, surname, email, phone_number, hashedPassword);
  return sanitizeUser({ id: userId, username, name, surname, email, phone_number });
};

export const loginUser = async ({ email, password }) => {
  if (!process.env.JWT_SECRET) {
    throw new ConfigurationError('JWT_SECRET is not configured');
  }
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AuthenticationError('Invalid email or password');
  }
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  return { accessToken, refreshToken };
};

export const refreshTokens = async (refreshToken) => {
  if (!refreshToken) {
    throw new AuthenticationError('Refresh token missing');
  }
  const userId = verifyRefreshToken(refreshToken);
  return generateAccessToken(userId);
};

export const logoutUser = async (refreshToken) => {
  if (refreshToken) {
    revokeRefreshToken(refreshToken);
  }
};

