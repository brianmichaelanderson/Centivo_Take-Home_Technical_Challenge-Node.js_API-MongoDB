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
