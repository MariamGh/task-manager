export const DELETE_USERS_SQL = 'DELETE FROM users';

export const INSERT_TEST_USER_SQL = `
  INSERT INTO users (name, surname, email, phone_number, password)
  VALUES ($1, $2, $3, $4, $5)
`; 