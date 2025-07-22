import express from 'express';
import authRoutes from './src/features/auth/routes/auth.route.js';
import taskRoutes from './src/features/tasks/routes/task.route.js';
import authMiddleware from './src/middlewares/auth/auth.middleware.js';
import errorHandlerMiddleware from './src/middlewares/error/error.handler.middleware.js';
import notFoundMiddleware from './src/middlewares/error/not.found.middleware.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/tasks', authMiddleware, taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Secure Task Management System');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
