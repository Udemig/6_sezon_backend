# Database Seeding

This project includes a comprehensive seeding system to populate your database with test data for development and testing purposes.

## What Gets Seeded

The seed function creates:

- **5 Users** (including 1 admin)
- **8 Cars** (various types: sedan, SUV, sports, luxury, etc.)
- **6 Bookings** (with different statuses: pending, confirmed, completed)
- **3 Reviews** (only for completed bookings)

## How to Run

### Method 1: NPM Script (Recommended)

```bash
npm run seed
```

### Method 2: Direct Script Execution

```bash
node scripts/seed.js
```

### Method 3: API Endpoint (Development Only)

```bash
curl -X POST http://localhost:3000/api/seed
```

Or visit `http://localhost:3000/api/seed` in your browser for info.

## Test Accounts

After seeding, you can use these test accounts:

### Admin Account

- **Email**: admin@carrental.com
- **Password**: admin123

### User Accounts

- **Email**: john.doe@example.com | **Password**: password123
- **Email**: jane.smith@example.com | **Password**: password123
- **Email**: mike.johnson@example.com | **Password**: password123
- **Email**: sarah.wilson@example.com | **Password**: password123

## Environment Requirements

Make sure you have:

- `MONGODB_URI` set in your `.env.local` file
- MongoDB connection working
- All dependencies installed (`npm install`)

## Important Notes

- **Destructive Operation**: The seed function clears all existing data before seeding
- **Development Only**: The API endpoint only works in development mode
- **Password Security**: All passwords are properly hashed using bcrypt
- **Data Relationships**: The seed maintains proper relationships between users, cars, bookings, and reviews

## Seeded Data Summary

### Cars

- Toyota Camry (Hybrid, NYC)
- Ford Explorer (SUV, LA)
- Honda Civic (Manual, Chicago)
- BMW X5 (Luxury, Miami)
- Tesla Model 3 (Electric, SF)
- Jeep Wrangler (Off-road, Denver)
- Porsche 911 (Sports, Las Vegas)
- Volkswagen Golf (Hatchback, Seattle)

### Bookings

- Various statuses (pending, confirmed, completed)
- Different date ranges and locations
- Realistic pricing calculations
- Notes and pickup/dropoff locations

### Reviews

- Only for completed bookings
- Ratings from 4-5 stars
- Detailed comments
- Approved and visible reviews

## Testing Your Endpoints

After seeding, you can test your API endpoints with real data:

- `GET /api/cars` - List all cars
- `GET /api/cars/[id]` - Get specific car details
- `POST /api/auth/login` - Login with test accounts
- `GET /api/bookings` - List bookings (requires auth)
- `POST /api/reviews` - Create reviews (requires auth)

## Troubleshooting

If seeding fails:

1. Check MongoDB connection
2. Verify environment variables
3. Ensure all dependencies are installed
4. Check console output for specific error messages

The seed function includes comprehensive error handling and logging to help debug issues.
