# Online Assessment Platform Backend

Production-ready backend for an online assessment platform built with Node.js, Express, and MongoDB.

## Features
- **Authentication**: JWT-based auth with Role-Based Access Control (Admin/Candidate).
- **Assessments**: Create, manage, and list assessments.
- **Questions**: MCQ support with automated evaluation.
- **Attempts**: Timed assessments with security checks.
- **Results**: Automated scoring and result generation.
- **Security**: Helmet, CORS, Rate Limiting, Password Hashing.

## Tech Stack
- Node.js & Express
- MongoDB (Atlas) & Mongoose
- JWT & BCrypt
- Express-Validator

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

3. **Run Server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new candidate
- `POST /api/auth/login` - Login

### Admin
- `POST /api/admin/assessments` - Create assessment
- `POST /api/admin/questions` - Add question
- `GET /api/admin/results` - View all results

### Candidate
- `GET /api/assessments` - List active assessments
- `POST /api/attempt/start/:id` - Start assessment
- `POST /api/attempt/submit/:id` - Submit assessment
- `GET /api/results/me` - View own results

## Folder Structure
```
backend/
├── src/
│   ├── config/       # Database config
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Custom middleware
│   ├── services/     # Business logic
│   └── utils/        # Utilities
├── server.js         # Entry point
└── .env              # Environment variables
```
