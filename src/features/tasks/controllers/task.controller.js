import * as taskService from '../services/task.service.js';
import { TaskResponseDto } from '../dtos/response/task.response.dto.js';
import NotFoundError from '../../../errors/types/not.found.error.js';
import SUCCESS_STATUS from '../../../errors/constants/success.status.js';
import { sanitizeTaskData } from '../../../utils/sanitize/sanitize.task.data.js';

export const createTask = async (req, res, next) => {
  try {
    const cleanTaskData = sanitizeTaskData(req.body);
    const task = await taskService.createTask(req.user.id, cleanTaskData);
    res.status(SUCCESS_STATUS.CREATED).json({ message: 'Task created successfully', task: TaskResponseDto(task) });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { page, limit } = req.pagination; 

    const { tasks, totalCount } = await taskService.getTasksByUser(req.user.id, page, limit);

    const taskDtos = tasks.map(TaskResponseDto);

    res.status(SUCCESS_STATUS.OK).json({
      data: taskDtos,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.user.id, req.params.id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    res.status(SUCCESS_STATUS.OK).json(TaskResponseDto(task));
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const cleanTaskData = sanitizeTaskData(req.body);
    const updated = await taskService.updateTask(req.user.id, req.params.id, cleanTaskData);
    if (!updated) {
      throw new NotFoundError('Task not found or not authorized');
    }
    res.status(SUCCESS_STATUS.OK).json({ message: 'Task updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const deleted = await taskService.deleteTask(req.user.id, req.params.id);
    if (!deleted) {
      throw new NotFoundError('Task not found or not authorized');
    }
    res.status(SUCCESS_STATUS.OK).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
