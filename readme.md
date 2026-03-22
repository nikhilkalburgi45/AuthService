# Authentication Service

A microservice for handling user authentication and authorization in an airline management system. This service provides secure JWT-based authentication for the entire airline management ecosystem.

## 🚀 Features

- User registration and login
- JWT token generation and verification
- Password encryption with bcrypt
- Secure authentication middleware
- User profile management

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL (Sequelize ORM)
- JWT for authentication
- bcrypt for password hashing
- Environment variables for configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Other airline services for integration

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
DB_NAME=airline_auth
DB_USERNAME=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_DIALECT=mysql
JWT_SECRET=your_jwt_secret_key
```

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);
```

## 📡 API Endpoints

### Base URL

```
http://localhost:3000/api/v1
```

### User Registration

```http
POST /signup
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "message": "Successfully created a new user",
  "success": true,
  "error": {},
  "data": {
    "id": 1,
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### User Login

```http
POST /signin
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "message": "Successfully logged in",
  "success": true,
  "error": {},
  "data": {
    "token": "jwt_token_here"
  }
}
```

## 🔒 Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Secure token generation and verification
- Input validation and sanitization
- Environment variable protection

## 🏗️ Project Structure

```
src/
├── config/
│   ├── config.json
│   └── ServerConfig.js
├── controllers/
│   └── user-controller.js
├── middlewares/
├── models/
│   ├── index.js
│   └── user.js
├── repository/
│   └── user-repository.js
├── routes/
│   ├── index.js
│   └── v1/
│       └── index.js
├── services/
│   └── user-service.js
├── utils/
└── index.js
```

## 🚀 Getting Started

### Using Docker (Recommended)

1. Clone the repository

```bash
git clone https://github.com/nikhilkalburgi45/AuthService.git
cd AuthService
```

2. Build the Docker image

```bash
docker build -t auth-service .
```

3. Run the container

```bash
docker run -p 3000:3000 --env-file .env auth-service
```

### Local Development

1. Clone the repository

```bash
git clone https://github.com/nikhilkalburgi45/AuthService.git
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run migrations

```bash
npx sequelize-cli db:migrate
```

5. Start the server

```bash
npm start
```

## 🔄 Service Integration

This service integrates with other airline management services:

- **Booking Service:** Provides user authentication for booking operations
- **Flight Service:** Validates user tokens for flight management
- **Reminder Service:** Authenticates users for notification services

## 📝 API Response Format

All API responses follow a standard format:

```json
{
    "message": "Success/Error message",
    "success": true/false,
    "error": {},
    "data": {}
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Nikhil Kalburgi** - [GitHub](https://github.com/nikhilkalburgi45)

## 🙏 Acknowledgments

- All contributors who have helped shape this project
- The Node.js and Express.js communities for excellent documentation
