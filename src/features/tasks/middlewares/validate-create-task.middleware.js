import ERROR_TYPES from '../../constants/error.types.js';

export const validateCreateTask = (req, res, next) => {
  const { error } = CreateTaskDto.validate(req.body);
  if (error) {
    return res.status(ERROR_TYPES.BAD_REQUEST).json({ error: error.details[0].message });
  }
  next();
};
