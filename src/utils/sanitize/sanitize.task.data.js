import { sanitizeInput } from './sanitize.input.js';

export const sanitizeTaskData = (taskData) => {
  if (!taskData) return taskData;

  return {
    ...taskData,
    title: sanitizeInput(taskData.title),
    description: sanitizeInput(taskData.description),
  };
};
