import express from 'express';
import { requestLogger, errorSimulation, authentication, notFoundHandler } from './middleware';
import { setupRoutes } from './routes';
import { startupMessage } from './utils/startup';

const PORT = process.env.PORT || 3000;

export const createApp = () => {
  const app = express();

  // Basic middleware
  app.use(express.json());

  // Custom middleware
  app.use(requestLogger);
  app.use(errorSimulation);
  app.use(authentication);

  // Routes
  setupRoutes(app);

  // 404 handler (must be last)
  app.use(notFoundHandler);

  return app;
};

// Only start the server if this file is run directly
if (require.main === module) {
  const app = createApp();

  app.listen(PORT, () => {
    startupMessage(PORT);
  });
}

export default createApp;
