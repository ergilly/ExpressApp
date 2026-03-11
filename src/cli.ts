#!/usr/bin/env node

import { createApp } from './app';
import { startupMessage } from './utils/startup';

const DEFAULT_PORT = 3000;

function parseArgs() {
  const args = process.argv.slice(2);
  let port = DEFAULT_PORT;
  let help = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--port':
      case '-p':
        port = parseInt(args[i + 1]) || DEFAULT_PORT;
        i++; // Skip next arg since we consumed it
        break;
      case '--help':
      case '-h':
        help = true;
        break;
    }
  }

  return { port, help };
}

function showHelp() {
  console.log(`
Test API Server - A simple Express server for testing purposes

Usage: test-api-server [options]

Options:
  -p, --port <number>    Port to run the server on (default: 3000)
  -h, --help            Show this help message

Examples:
  test-api-server                 # Run on default port 3000
  test-api-server --port 8080     # Run on port 8080
  test-api-server -p 4000         # Run on port 4000

Available Endpoints:
  GET    /health                  # Health check (no auth required)
  GET    /users                   # Get all users (auth required)
  GET    /users/:id               # Get user by ID (auth required)
  POST   /users                   # Create user (auth required)
  PUT    /users/:id               # Update user (auth required)
  DELETE /users/:id               # Delete user (auth required)

Authentication:
  Include "Authorization: Bearer <any-token>" header for protected routes

Testing Features:
  Add "x-force-error: 500" header to simulate server errors

NPM Scripts Available:
  npm run start                   # Run the built server
  npm run dev                     # Run in development mode
  npm run build                   # Build the TypeScript project
  npm run server                  # Build and start production server
  npm run server:dev              # Start development server
`);
}

function main() {
  const { port, help } = parseArgs();

  if (help) {
    showHelp();
    process.exit(0);
  }

  // Set the PORT environment variable so the app uses the specified port
  process.env.PORT = port.toString();

  const app = createApp();

  app.listen(port, () => {
    console.log('🚀 Test API Server Started');
    startupMessage(port);
    console.log('\n💡 Tip: Use --help for more options');
    console.log('📚 API Documentation: ./node_modules/@ergilly/test-api-server/docs/swagger.yaml');
    console.log('🛠️  You can also use npm scripts: npm run start, npm run dev, npm run server');
  });
}

if (require.main === module) {
  main();
}

export { main as startServer };
