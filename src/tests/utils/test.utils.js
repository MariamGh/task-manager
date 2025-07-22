import pool from '../config/database.js';
import bcrypt from 'bcrypt';
import request from 'supertest';
import app from '../app.js';
import { DELETE_USERS_SQL, INSERT_TEST_USER_SQL } from './test.sql.js';

export async function createTestUserAndGetToken() {
  await pool.query(DELETE_USERS_SQL);

  const password = 'testpass';
  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    INSERT_TEST_USER_SQL,
    ['Jane', 'Doe', 'jane@example.com', '1231231234', hashedPassword]
  );

  const res = await request(app).post('/api/auth/login').send({
    email: 'jane@example.com',
    password
  });

  if (!res.body.token) throw new Error('Failed to receive token');
  return res.body.token;
}
