export const formatPaginatedResponse = (data, page, limit, total) => ({
  data,
  meta: {
    totalItems: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    pageSize: limit
  }
});
