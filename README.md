## Approach

The implementation prioritizes clean architecture and robust error handling by separating concerns into distinct modules. The age filtering logic is handled at the database query level using MongoDB's `$gt` operator for optimal performance, while input validation prevents invalid ObjectId queries from reaching the database. This approach ensures both security and efficiency while maintaining code readability and maintainability.




## API Documentation

### GET /users/:id

Retrieves a user by their MongoDB ObjectId, but only if they are over 21 years old.

#### Parameters
- `id` (string, required): MongoDB ObjectId of the user

#### Success Response (200)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe", 
  "email": "johndoe@email.com",
  "age": 30,
  "__v": 0
}
```

#### Error Responses

**400 Bad Request - Invalid ObjectId**
```json
{
  "error": "Invalid user ID"
}
```

**404 Not Found - User not found or 21 or younger**
```json
{
  "error": "User not found or is 21 or younger"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal Server Error",
  "message": "Error details"
}
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (see setup options below)
- npm or yarn package manager

## Setup Instructions

### 1. Clone and Install
```bash
git clone <repository-url>
cd Centivo_Take-Home_Technical_Challenge–Node.js_API+MongoDB
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/centivo_api
PORT=3000
```

### 3. MongoDB Setup Options

**Option A: Using Docker (Recommended)**
```bash
# Start MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option B: Local MongoDB Installation**
```bash
# macOS
brew services start mongodb/brew/mongodb-community

# Linux/Ubuntu
sudo systemctl start mongod

# Windows
net start MongoDB
```

*Note: This project uses MongoDB as a database only. The Node.js application runs locally, not in Docker.*

### 4. Seed Database (Optional)
```bash
npm run seed
```

### 5. Start the Application
```bash
npm start
```

The API will be available at `http://localhost:3000`

## Testing Examples

Using curl:

```bash
# Test with valid user over 21 (use actual ObjectId from seeded data)
curl http://localhost:3000/users/507f1f77bcf86cd799439011

# Test with invalid ObjectId format
curl http://localhost:3000/users/invalid123

# Test with valid ObjectId but non-existent user
curl http://localhost:3000/users/507f1f77bcf86cd799439999
```

## Development Scripts

```bash
npm start        # Start the production server
npm run seed     # Seed database with sample data
npm run dev      # Start development server (if nodemon is installed)
```

## Testing

While this implementation focuses on core functionality for the assessment, a production-ready version would benefit from comprehensive testing including:

- **Unit Tests**: Route handlers, validation logic, and error handling
- **Integration Tests**: Database operations and API endpoint behavior  
- **End-to-End Tests**: Complete request/response cycles with various scenarios

Recommended testing frameworks for future implementation:
- **Jest** for unit and integration testing
- **Supertest** for HTTP assertions

The current implementation has been manually tested with curl commands covering all error scenarios and success cases.
