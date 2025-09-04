import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    statusCode: 404,
    statusMessage: 'Route not found',
    body: { error: `Route ${req.originalUrl} not found` }
  });
};
