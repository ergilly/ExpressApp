import { Express } from 'express';
import healthRoutes from './health';
import userRoutes from './users';

export const setupRoutes = (app: Express) => {
  app.use('/', healthRoutes);
  app.use('/', userRoutes);
};
