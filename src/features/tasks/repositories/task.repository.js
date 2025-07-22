import pool from '../../../config/database.js';

export const createTask = async (userId, { title, description, status }) => {
  const [result] = await pool.query(
    `INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)`,
    [userId, title, description, status]
  );
  return { id: result.insertId, user_id: userId, title, description, status };
};

export const getTasksByUser = async (userId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const [tasks] = await pool.query(
    `SELECT * FROM tasks WHERE user_id = ? LIMIT ? OFFSET ?`,
    [userId, limit, offset]
  );

  const [[{ count }]] = await pool.query(
    `SELECT COUNT(*) AS count FROM tasks WHERE user_id = ?`,
    [userId]
  );

  return {
    tasks: tasks || [],
    totalCount: count || 0,
  };
};


export const getTaskById = async (userId, taskId) => {
  const [rows] = await pool.query(`SELECT * FROM tasks WHERE id = ? AND user_id = ?`, [taskId, userId]);
  return rows[0];
};

export const updateTask = async (userId, taskId, taskData) => {
  const fields = [];
  const values = [];

  if (taskData.title !== undefined) {
    fields.push('title = ?');
    values.push(taskData.title);
  }
  if (taskData.description !== undefined) {
    fields.push('description = ?');
    values.push(taskData.description);
  }
  if (taskData.status !== undefined) {
    fields.push('status = ?');
    values.push(taskData.status);
  }

  if (fields.length === 0) return false; 

  values.push(taskId, userId);

  const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`;

  const [result] = await pool.query(sql, values);
  return result.affectedRows > 0;
};


export const deleteTask = async (userId, taskId) => {
  const [result] = await pool.query(`DELETE FROM tasks WHERE id = ? AND user_id = ?`, [taskId, userId]);
  return result.affectedRows > 0;
};
