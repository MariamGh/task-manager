# Task Manager

A secure, modular, and scalable Node.js application for managing personal task lists with user authentication and SQL database integration.

## Features

- **User Authentication**: Secure registration, login, JWT access tokens, refresh tokens, and password hashing.
- **Task Management**: Add, view, update, and delete personal tasks. Update task status (pending, in progress, completed).
- **User Restrictions**: Users can only access and modify their own tasks.
- **Validation & Security**: Input validation (Joi), sanitization, rate limiting, and error handling to prevent common attacks (SQL injection, XSS, brute force).
- **Pagination**: Paginated task listing for scalability.
- **Testing**: Modular structure with test folders for features.

## Tech Stack

- Node.js, Express.js
- SQL Database (MySQL or compatible)
- JWT for authentication
- bcrypt for password hashing
- Joi for validation

## Project Structure

```
task-manager/
  app.js
  server.js
  src/
    config/
    errors/
    features/
      auth/
      tasks/
      pagination/
    middlewares/
    utils/
```

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm
- MySQL (or compatible SQL database)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd task-manager
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env` and set values for:
     - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
     - `JWT_SECRET`
     - `NODE_ENV`
4. Set up the database:
   - Create the database and required tables (see `src/config/database.js` for schema hints).

### Running the Application
```bash
npm start
```
The server will run on the port specified in your `.env` or default to 3000.

## API Overview

### Auth Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive tokens
- `POST /api/auth/refresh-token` — Refresh access token
- `POST /api/auth/logout` — Logout and revoke refresh token

### Task Endpoints (require authentication)
- `POST /api/tasks/` — Create a new task
- `GET /api/tasks/` — List tasks (paginated)
- `GET /api/tasks/:id` — Get a specific task
- `PUT /api/tasks/:id` — Update a task
- `DELETE /api/tasks/:id` — Delete a task

## Security
- Passwords are hashed with bcrypt before storage.
- JWT tokens are used for authentication; refresh tokens are stored as HTTP-only cookies.
- All input is validated and sanitized.
- Rate limiting is applied to login endpoints.
- SQL queries use parameterized statements to prevent injection.

## Testing
- Tests are located in `src/features/*/tests/` and `src/tests/`.
- Run tests with:
  ```bash
  npm test
  ```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
