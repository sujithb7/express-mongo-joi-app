# Express.js MongoDB CRUD API with Joi Validation

This is a Node.js backend server built with Express.js that connects to MongoDB using Mongoose. It provides CRUD functionality for managing users with validation using Joi.

## Features

- RESTful API with CRUD operations
- Input validation using Joi
- MongoDB integration with Mongoose
- Environment variables managed with dotenv
- Custom request logging middleware
- Structured project organization

## Project Structure

```
express-mongo-joi-app/
├── index.js
├── .env.sample
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── models/
│   └── User.js
├── routes/
│   └── users.js
├── validators/
│   └── userValidator.js
├── middleware/
│   └── logger.js
```

## Requirements

- Node.js (LTS)
- MongoDB (local or Atlas)
- npm

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/sujithb7/express-mongo-joi-app.git
cd express-mongo-joi-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/test_db
```

### 4. Start the server

```bash
npm start
```

Server runs at: `http://localhost:5000`

---

## API Endpoints

### GET /api/users

Returns all users.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25
    }
  ]
}
```

---

### POST /api/users

Creates a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

**Validation Rules:**
- `name`: string, min 3, max 30 (required)
- `email`: valid email (required)
- `age`: number, 1–120 (required)

**Success:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25
  }
}
```

**Validation Error:**
```json
{
  "success": false,
  "message": "Validation error: <error details>"
}
```

---

### PUT /api/users/:id

Updates a user by ID.

**Request Body:** Same as POST

**Success:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "name": "Updated Name",
    "email": "updated@example.com",
    "age": 30
  }
}
```

---

### DELETE /api/users/:id

Deletes a user by ID.

**Success:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Middleware

Logs incoming requests:

- HTTP method
- URL
- Timestamp

## Error Handling

Handles:
- Joi validation errors
- Database connection issues
- Unknown routes

## Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- Joi
- dotenv
- nodemon

## License

MIT License
