# Express TypeScript Test App

A simple Express.js TypeScript application with basic CRUD operations for testing frameworks. The application features a clean, modular architecture with separated concerns.

## Project Structure

```
src/
├── app.ts                    # Main app setup and server startup
├── data/
│   └── userStore.ts         # In-memory data storage and operations
├── middleware/
│   ├── index.ts             # Middleware exports
│   ├── auth.ts              # Authentication middleware
│   ├── errorSimulation.ts   # Error simulation middleware
│   ├── logger.ts            # Request logging middleware
│   └── notFound.ts          # 404 handler middleware
├── routes/
│   ├── index.ts             # Route setup configuration
│   ├── health.ts            # Health check endpoints
│   └── users.ts             # User management endpoints
├── types/
│   └── index.ts             # TypeScript type definitions
└── utils/
    └── startup.ts           # Server startup messages
docs/
└── swagger.yaml             # OpenAPI 3.0 specification
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Start the server:
   ```bash
   npm run dev  # Development mode with ts-node
   # OR
   npm start    # Production mode (requires build first)
   ```

The server will start on `http://localhost:3000`

## Architecture Features

### Modular Design
- **Separation of Concerns**: Each module has a single responsibility
- **Middleware System**: Configurable middleware for different features
- **Type Safety**: Full TypeScript support with proper interfaces
- **Clean Routes**: Combined route definitions with handler logic

### Middleware Components
- **Request Logging**: Tracks all incoming requests with timestamps
- **Authentication**: Bearer token validation (accepts any token)
- **Error Simulation**: Force errors for testing via headers
- **404 Handler**: Standardized not-found responses

### Data Layer
- **In-Memory Store**: Simple user data management
- **CRUD Operations**: Create, Read, Update, Delete functionality
- **Type-Safe Operations**: All operations use proper TypeScript types

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Start the server:
   ```bash
   npm run dev  # Development mode with ts-node
   # OR
   npm start    # Production mode (requires build first)
   ```

The server will start on `http://localhost:3000`

## API Endpoints

All responses follow the format:
```json
{
  "statusCode": 200,
  "statusMessage": "Success message",
  "body": { /* response data */ }
}
```

### Error Simulation
To test error handling, you can force a 500 Internal Server Error on any endpoint by including the header:
```
x-force-error: 500
```
or
```
x-force-error: true
```

### Authentication
Most endpoints require authentication. Include any Bearer token in the Authorization header:
```
Authorization: Bearer any-token-here
```

The `/health` endpoint does not require authentication.

### Health Check
- **GET** `/health` - Check server status (no auth required)

### User Management (Auth Required)
- **GET** `/users` - Get all users
- **GET** `/users/:id` - Get user by ID
- **POST** `/users` - Create new user
- **PUT** `/users/:id` - Update user by ID
- **DELETE** `/users/:id` - Delete user by ID

## Example Requests

### GET All Users
```bash
curl -H "Authorization: Bearer test-token" http://localhost:3000/users
```

### GET User by ID
```bash
curl -H "Authorization: Bearer test-token" http://localhost:3000/users/1
```

### POST Create User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test-token" \
  -d '{"name": "Alice Johnson", "email": "alice@example.com"}'
```

### PUT Update User
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test-token" \
  -d '{"name": "John Updated", "email": "john.updated@example.com"}'
```

### DELETE User
```bash
curl -X DELETE http://localhost:3000/users/1 \
  -H "Authorization: Bearer test-token"
```

### Test Authentication Failure
```bash
# This will return 401 Unauthorized
curl http://localhost:3000/users
```

### Force 500 Error (for testing)
```bash
# Force error on any endpoint
curl -H "x-force-error: 500" http://localhost:3000/users

# Force error on POST request
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "x-force-error: true" \
  -d '{"name": "Test User", "email": "test@example.com"}'
```

## Response Examples

### Successful Response
```json
{
  "statusCode": 200,
  "statusMessage": "User retrieved successfully",
  "body": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### Error Response
```json
{
  "statusCode": 404,
  "statusMessage": "User not found",
  "body": {
    "error": "User with id 999 does not exist"
  }
}
```

### 500 Error Response (when forced)
```json
{
  "statusCode": 500,
  "statusMessage": "Internal Server Error - Forced error for testing",
  "body": {
    "error": "This is a simulated internal server error triggered by the x-force-error header",
    "timestamp": "2025-09-04T10:30:00.000Z",
    "endpoint": "/users",
    "method": "GET"
  }
}
```

### 401 Unauthorized Response
```json
{
  "statusCode": 401,
  "statusMessage": "Unauthorized - Authentication required",
  "body": {
    "error": "Missing or invalid authorization token",
    "message": "Please provide a Bearer token in the Authorization header"
  }
}
```

## Development

### File Organization
- **`src/app.ts`**: Main application entry point, middleware setup, and server startup
- **`src/data/userStore.ts`**: Centralized data operations for user management
- **`src/middleware/`**: Reusable middleware components for different concerns
- **`src/routes/`**: Route definitions with inline request handlers
- **`src/types/`**: TypeScript interfaces and type definitions
- **`src/utils/`**: Utility functions and helpers

### Adding New Features
1. **New Endpoint**: Add routes in appropriate route file (`src/routes/`)
2. **New Middleware**: Create in `src/middleware/` and export from index
3. **Data Operations**: Extend `src/data/userStore.ts` or create new store
4. **Types**: Add interfaces to `src/types/index.ts`

### Development Workflow
- Source files are in `src/`
- Built files go to `dist/`
- Use `npm run dev` for development with auto-reload
- Use `npm run build` to compile TypeScript to JavaScript

## Documentation

- **API Documentation**: See `docs/swagger.yaml` for complete OpenAPI specification
- **Swagger UI**: View at [https://editor.swagger.io/](https://editor.swagger.io/) by pasting the YAML content
