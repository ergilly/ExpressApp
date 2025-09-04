import { Request, Response, NextFunction } from 'express';

export const errorSimulation = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['x-force-error'] === '500' || req.headers['x-force-error'] === 'true') {
    console.log(`🚨 Forcing 500 error for ${req.method} ${req.originalUrl}`);
    return res.status(500).json({
      statusCode: 500,
      statusMessage: 'Internal Server Error - Forced error for testing',
      body: { 
        error: 'This is a simulated internal server error triggered by the x-force-error header',
        timestamp: new Date().toISOString(),
        endpoint: req.originalUrl,
        method: req.method
      }
    });
  }
  next();
};
