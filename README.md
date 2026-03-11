# @ergilly/test-api-server

Reusable Express + TypeScript test API server, distributed as an npm package with a CLI binary: `test-api-server`.

This package is designed for test frameworks that need a predictable API with:
- health checks
- authenticated CRUD endpoints
- forced error simulation for negative-path testing

## Install

### From npm registry
```bash
npm install --save-dev @ergilly/test-api-server
```

### From GitHub
```bash
npm install --save-dev git+https://github.com/ergilly/ExpressApp.git
# or specific version/tag
npm install --save-dev git+https://github.com/ergilly/ExpressApp.git#v1.0.0
```

### From local tarball
```bash
# In this repo
npm pack

# In your consuming project
npm install --save-dev ./path/to/ergilly-test-api-server-1.0.0.tgz
```

## Quick Start (CLI / Bin Command)

After installation, run with the package binary:

```bash
npx test-api-server
```

Run on a custom port:

```bash
npx test-api-server --port 3001
# or
npx test-api-server -p 3001
```

CLI help:

```bash
npx test-api-server --help
```

## CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `-p, --port <number>` | Port to run the server on | `3000` |
| `-h, --help` | Show usage/help output | — |

## API Summary

Base URL: `http://localhost:<port>`

### Response envelope

```json
{
  "statusCode": 200,
  "statusMessage": "Success message",
  "body": {}
}
```

### Authentication behavior

- `GET /health` is public
- all `/users*` routes require `Authorization: Bearer <any-token>`
- missing/invalid bearer token returns `401`

### Error simulation behavior

Add either header on any endpoint to force a `500` response:

```http
x-force-error: 500
```

or

```http
x-force-error: true
```

### Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| `GET` | `/health` | No | Server health/uptime |
| `GET` | `/users` | Yes | Get all users |
| `GET` | `/users/:id` | Yes | Get user by ID |
| `POST` | `/users` | Yes | Create user |
| `PUT` | `/users/:id` | Yes | Update user |
| `DELETE` | `/users/:id` | Yes | Delete user |

## Usage in Test Frameworks

### Start/stop in test setup

```javascript
const { spawn } = require('child_process');

let serverProcess;

before(async () => {
  serverProcess = spawn('npx', ['test-api-server', '--port', '3001'], {
    stdio: 'pipe'
  });

  await new Promise((resolve) => {
    serverProcess.stdout.on('data', (data) => {
      if (data.toString().includes('Server is running')) {
        resolve();
      }
    });
  });
});

after(() => {
  if (serverProcess) serverProcess.kill();
});
```

### Programmatic usage

```javascript
const { createApp } = require('@ergilly/test-api-server');

const app = createApp();
const server = app.listen(3001);

module.exports = { app, server };
```

### CI example

```yaml
- name: Start Test API Server
  run: npx test-api-server --port 3001 &

- name: Wait for server
  run: npx wait-on http://localhost:3001/health

- name: Run tests
  run: npm test
```

## Request Examples

```bash
# Health
curl http://localhost:3000/health

# Get users (authenticated)
curl -H "Authorization: Bearer test-token" http://localhost:3000/users

# Create user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test-token" \
  -d '{"name":"Alice Johnson","email":"alice@example.com"}'

# Force a 500 for testing
curl -H "Authorization: Bearer test-token" \
  -H "x-force-error: 500" \
  http://localhost:3000/users
```

## Local Development (this repo)

```bash
npm install
npm run build
npm run dev
```

Useful scripts:
- `npm run build` – compile TypeScript to `dist/`
- `npm run start` – run compiled app (`dist/app.js`)
- `npm run cli` – run CLI from TypeScript source
- `npm run server` – build and start compiled app

## Package Layout

```text
@ergilly/test-api-server/
├── dist/         # Compiled JS (includes cli.js)
├── docs/         # OpenAPI docs
├── src/          # Source (repo only)
├── README.md
└── package.json
```

## Distribution Recommendation

Preferred team distribution is a private npm registry so teams can pin versions and update independently.

Typical workflow:
1. update package
2. bump version
3. publish (`npm publish` or company registry)
4. teams upgrade when ready

## Publish to npmjs.com (Public)

Run from this package root.

```bash
# 1) Authenticate
npm login
npm whoami

# 2) Build and verify package contents
npm run build
npm pack --dry-run

# 3) Bump version (required for every publish)
npm version patch

# 4) Publish (scoped package is configured for public access)
npm publish
```

Notes:
- package name must stay unique: `@ergilly/test-api-server`
- if npm returns version conflict, bump version and publish again
- verify after publish: `npm view @ergilly/test-api-server version`

## Documentation

- OpenAPI spec: `docs/swagger.yaml`
- API collection: `bruno/`
