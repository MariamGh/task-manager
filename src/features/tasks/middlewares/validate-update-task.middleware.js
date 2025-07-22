import { UpdateTaskDto } from '../dtos/request/task.update.dto.js';
import ERROR_TYPES from '../../constants/error.types.js';

export const validateUpdateTask = (req, res, next) => {
  const { error } = UpdateTaskDto.validate(req.body);
  if (error) {
    return res.status(ERROR_TYPES.BAD_REQUEST).json({ error: error.details[0].message });
  }
  next();
};
