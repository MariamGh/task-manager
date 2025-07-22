import { PaginationRequestDto } from '../dtos/request/pagination.request.dto.js';

export function validatePagination(req, res, next) {
  const { error, value } = PaginationRequestDto.validate(req.query);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  req.pagination = value;
  next();
}
