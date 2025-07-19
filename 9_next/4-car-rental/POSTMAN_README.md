# Car Rental API - Postman Collection

This Postman collection provides comprehensive testing for all API endpoints in the car rental Next.js application.

## Import Instructions

1. Open Postman
2. Click "Import" button
3. Select the `postman.json` file
4. The collection will be imported with all endpoints organized in folders

## Environment Variables

The collection uses the following variables that you can configure:

- `BASE_URL`: Your application base URL (default: `http://localhost:3000`)
- `CAR_ID`: ID of a car for testing individual car endpoints
- `BOOKING_ID`: ID of a booking for testing review endpoints
- `NEXT_AUTH_COOKIE`: NextAuth session cookie for authenticated requests

### Setting Variables

1. Click on the collection name in Postman
2. Go to the "Variables" tab
3. Update the values as needed

## API Endpoints Covered

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **GET** `/api/auth/session` - Get current session
- **GET** `/api/auth/providers` - Get available auth providers
- **GET** `/api/auth/csrf` - Get CSRF token

### Cars

- **GET** `/api/cars` - Get all cars (with pagination)
- **GET** `/api/cars?filters` - Get cars with filters (search, type, price range, etc.)
- **POST** `/api/cars` - Create a new car
- **GET** `/api/cars/:id` - Get car details with reviews
- **PUT** `/api/cars/:id` - Update car information
- **DELETE** `/api/cars/:id` - Delete a car

### Reviews

- **POST** `/api/reviews` - Create a review (requires authentication)
- **GET** `/api/reviews` - Get all reviews
- **GET** `/api/reviews?carId=:id` - Get reviews for specific car

### Checkout

- **POST** `/api/checkout` - Process checkout (requires authentication)

### Database

- **POST** `/api/seed` - Seed database with sample data (dev only)
- **GET** `/api/seed` - Get seed endpoint information

## Testing Workflow

### 1. Setup Environment

```bash
# Start your Next.js application
npm run dev
```

### 2. Seed Database (Development)

Run the "Seed Database" request to populate your database with sample data.

### 3. Test Basic Endpoints

- Test "Get All Cars" to verify basic connectivity
- Test "Get Seed Info" to confirm the API is responding

### 4. Test Car Operations

- Use "Create Car" to add a new car
- Copy the returned car ID to the `CAR_ID` variable
- Test "Get Car by ID", "Update Car", and "Delete Car"

### 5. Test Authentication

- Use "Register User" to create a test user account
- For authenticated endpoints, you'll need to:
  1. Log in through the web interface to get a session cookie
  2. Copy the NextAuth cookie to the `NEXT_AUTH_COOKIE` variable

### 6. Test Reviews and Checkout

- Use "Create Review" (requires authentication and completed booking)
- Use "Process Checkout" (requires authentication)

## Sample Data

### User Registration

```json
{
  "email": "john.doe@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

### Car Creation

```json
{
  "make": "Tesla",
  "modelName": "Model 3",
  "year": 2023,
  "type": "sedan",
  "transmission": "automatic",
  "fuelType": "electric",
  "seats": 5,
  "doors": 4,
  "pricePerDay": 150,
  "images": ["https://example.com/tesla-model3-1.jpg"],
  "description": "Premium electric sedan with autopilot features.",
  "features": ["Autopilot", "Supercharging"],
  "location": "San Francisco, CA",
  "mileage": 15000,
  "color": "Pearl White",
  "licensePlate": "TESLA123"
}
```

## Query Parameters for Cars Endpoint

The cars endpoint supports extensive filtering:

- `search`: Search in make, model, or description
- `type`: Filter by car type (sedan, suv, hatchback, sports, luxury)
- `minPrice`/`maxPrice`: Price range filter
- `transmission`: manual or automatic
- `fuelType`: gasoline, diesel, hybrid, electric
- `seats`: Number of seats
- `limit`: Results per page (default: 12)
- `page`: Page number (default: 1)
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: asc or desc (default: desc)

## Authentication Notes

Some endpoints require authentication:

- **POST** `/api/reviews` - Requires valid user session
- **POST** `/api/checkout` - Requires valid user session

To test these endpoints:

1. Register a user via the API
2. Log in through the web interface (`/auth/login`)
3. Copy the session cookie from browser dev tools
4. Add it to the `NEXT_AUTH_COOKIE` variable

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error responses include descriptive messages to help with debugging.
