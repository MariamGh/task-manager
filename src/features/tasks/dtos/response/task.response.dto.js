export const TaskResponseDto = (task) => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  createdAt: task.created_at,
  updatedAt: task.updated_at,
});
