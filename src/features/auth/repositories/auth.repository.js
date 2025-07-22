import pool from '../../../config/database.js';

export const findUserByUsernameEmailOrPhone = async (username, email, phone_number) => {
  const [rows] = await pool.query(
    'SELECT id FROM users WHERE username = ? OR email = ? OR phone_number = ?',
    [username, email, phone_number]
  );
  return rows;
};

export const insertUser = async (username, name, surname, email, phone_number, hashedPassword) => {
  const [result] = await pool.query(
    'INSERT INTO users (username, name, surname, email, phone_number, password) VALUES (?, ?, ?, ?, ?, ?)',
    [username, name, surname, email, phone_number, hashedPassword]
  );
  return result.insertId;
};

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};
