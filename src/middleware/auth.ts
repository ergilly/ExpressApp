import { Request, Response, NextFunction } from 'express';

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  // Skip auth for health endpoint
  if (req.originalUrl === '/health') {
    return next();
  }

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
  
  if (!bearerToken || bearerToken.trim() === '') {
    console.log(`🔒 Authentication failed for ${req.method} ${req.originalUrl} - No token provided`);
    return res.status(401).json({
      statusCode: 401,
      statusMessage: 'Unauthorized - Authentication required',
      body: { 
        error: 'Missing or invalid authorization token',
        message: 'Please provide a Bearer token in the Authorization header'
      }
    });
  }

  console.log(`✅ Authentication successful for ${req.method} ${req.originalUrl} - Token: ${bearerToken.substring(0, 10)}...`);
  next();
};
