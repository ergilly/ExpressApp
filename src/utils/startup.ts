export const startupMessage = (port: number | string) => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('  GET    /health (no auth required)');
  console.log('  GET    /users (auth required)');
  console.log('  GET    /users/:id (auth required)');
  console.log('  POST   /users (auth required)');
  console.log('  PUT    /users/:id (auth required)');
  console.log('  DELETE /users/:id (auth required)');
  console.log('');
  console.log('📝 Authentication: Include "Authorization: Bearer <any-token>" header for protected routes');
};
