import * as taskRepo from '../repositories/task.repository.js';
import { TaskStatusEnum } from '../enums/task.status.enum.js';
import ValidationError from '../../../errors/types/validation.error.js';

export const createTask = async (userId, taskData) => {
  if (!taskData.status) {
    taskData.status = TaskStatusEnum.PENDING;
  }
  if (!Object.values(TaskStatusEnum).includes(taskData.status)) {
    throw new ValidationError('Invalid task status');
  }
  return await taskRepo.createTask(userId, taskData);
};

export const getTasksByUser = async (userId, page = 1, limit = 10) => {
  return await taskRepo.getTasksByUser(userId, page, limit);
};

export const getTaskById = async (userId, taskId) => {
  return await taskRepo.getTaskById(userId, taskId);
};

export const updateTask = async (userId, taskId, taskData) => {
  if (taskData.status && !Object.values(TaskStatusEnum).includes(taskData.status)) {
    throw new ValidationError('Invalid task status');
  }

  return await taskRepo.updateTask(userId, taskId, taskData);
};

export const deleteTask = async (userId, taskId) => {
  return await taskRepo.deleteTask(userId, taskId);
};
