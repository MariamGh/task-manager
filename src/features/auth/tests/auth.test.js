import request from 'supertest';
import app from '../../../../app.js';
import pool from '../../../config/database.js';
import { ERROR_TYPES } from '../../../errors/constants/error.types.js';
import SUCCESS_STATUS from '../../../errors/constants/success.status.js';

const testUser = {
  username: 'testuser',
  name: 'Test',
  surname: 'User',
  email: 'testuser@example.com',
  phone_number: '1234567890',
  password: 'strongPass123'
};

beforeAll(async () => {
  await pool.query('DELETE FROM users');
});

afterAll(async () => {
  await pool.query('DELETE FROM users');
  await pool.end();
});

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(SUCCESS_STATUS.CREATED);
    expect(res.body.user).toHaveProperty('id');
  });

  it('should not allow duplicate registration', async () => {
    await request(app)
      .post('/api/auth/register')
      .send(testUser);

    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(ERROR_TYPES.CONFLICT);
    expect(res.body).toHaveProperty('error');
  });

  it('should login the user and return an accessToken', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.statusCode).toBe(SUCCESS_STATUS.OK);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('should return UNAUTHORIZED for invalid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongPassword'
      });

    expect(res.statusCode).toBe(ERROR_TYPES.UNAUTHORIZED);
    expect(res.body).toHaveProperty('error');
  });
});
