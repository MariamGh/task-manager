import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';
import authMiddleware from '../../../middlewares/auth/auth.middleware.js';
import { validateMiddleware } from '../../../middlewares/validation/validate.middleware.js';
import { CreateTaskDto } from '../dtos/request/create.task.dto.js';
import { UpdateTaskDto } from '../dtos/request/update.task.dto.js';
import { validatePagination } from '../../pagination/middlewares/validate.pagination.middleware.js';

const TaskRouter = express.Router();

TaskRouter.use(authMiddleware);

TaskRouter.post('/', validateMiddleware(CreateTaskDto), createTask);

TaskRouter.get('/', validatePagination, getTasks);

TaskRouter.get('/:id', getTaskById);
TaskRouter.put('/:id', validateMiddleware(UpdateTaskDto), updateTask);
TaskRouter.delete('/:id', deleteTask);

export default TaskRouter;
