import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectMongo from "./mongodb";
import User from "./models/User";
import Car from "./models/Car";
import Booking from "./models/Booking";
import Review from "./models/Review";

// Test data
const testUsers = [
  {
    email: "admin@carrental.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    phone: "+1234567890",
    isAdmin: true,
    isEmailVerified: true,
  },
  {
    email: "john.doe@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    phone: "+1234567891",
    isAdmin: false,
    isEmailVerified: true,
  },
  {
    email: "jane.smith@example.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+1234567892",
    isAdmin: false,
    isEmailVerified: true,
  },
  {
    email: "mike.johnson@example.com",
    password: "password123",
    firstName: "Mike",
    lastName: "Johnson",
    phone: "+1234567893",
    isAdmin: false,
    isEmailVerified: true,
  },
  {
    email: "sarah.wilson@example.com",
    password: "password123",
    firstName: "Sarah",
    lastName: "Wilson",
    phone: "+1234567894",
    isAdmin: false,
    isEmailVerified: false,
  },
];

const testCars = [
  {
    make: "Toyota",
    modelName: "Camry",
    year: 2023,
    type: "sedan",
    transmission: "automatic",
    fuelType: "hybrid",
    seats: 5,
    doors: 4,
    pricePerDay: 65,
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
    ],
    description:
      "A reliable and fuel-efficient sedan perfect for city driving and long trips.",
    features: [
      "Bluetooth",
      "GPS Navigation",
      "Backup Camera",
      "Cruise Control",
      "Heated Seats",
    ],
    location: "New York, NY",
    isAvailable: true,
    mileage: 15000,
    color: "White",
    licensePlate: "NYC-001",
  },
  {
    make: "Ford",
    modelName: "Explorer",
    year: 2022,
    type: "suv",
    transmission: "automatic",
    fuelType: "gasoline",
    seats: 7,
    doors: 5,
    pricePerDay: 85,
    images: [
      "https://images.unsplash.com/photo-1519440073355-f99c045df80c?w=800",
      "https://images.unsplash.com/photo-1519440073355-f99c045df80c?w=800",
    ],
    description:
      "Spacious SUV ideal for families and group trips with plenty of cargo space.",
    features: [
      "4WD",
      "Third Row Seating",
      "Roof Rack",
      "Tow Package",
      "Apple CarPlay",
    ],
    location: "Los Angeles, CA",
    isAvailable: true,
    mileage: 22000,
    color: "Blue",
    licensePlate: "CA-002",
  },
  {
    make: "Honda",
    modelName: "Civic",
    year: 2024,
    type: "sedan",
    transmission: "manual",
    fuelType: "gasoline",
    seats: 5,
    doors: 4,
    pricePerDay: 45,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
    ],
    description:
      "Compact and efficient car perfect for urban driving with excellent fuel economy.",
    features: [
      "Manual Transmission",
      "Sunroof",
      "Sport Mode",
      "Honda Sensing",
      "Wireless Charging",
    ],
    location: "Chicago, IL",
    isAvailable: true,
    mileage: 8000,
    color: "Red",
    licensePlate: "IL-003",
  },
  {
    make: "BMW",
    modelName: "X5",
    year: 2023,
    type: "luxury",
    transmission: "automatic",
    fuelType: "gasoline",
    seats: 5,
    doors: 5,
    pricePerDay: 150,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    ],
    description:
      "Premium luxury SUV with exceptional comfort and performance features.",
    features: [
      "Leather Seats",
      "Panoramic Sunroof",
      "Premium Audio",
      "Adaptive Cruise",
      "Wireless Charging",
    ],
    location: "Miami, FL",
    isAvailable: true,
    mileage: 12000,
    color: "Black",
    licensePlate: "FL-004",
  },
  {
    make: "Tesla",
    modelName: "Model 3",
    year: 2023,
    type: "sedan",
    transmission: "automatic",
    fuelType: "electric",
    seats: 5,
    doors: 4,
    pricePerDay: 95,
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
    ],
    description:
      "Revolutionary electric sedan with autopilot and cutting-edge technology.",
    features: [
      "Autopilot",
      "Supercharging",
      "Premium Connectivity",
      "Glass Roof",
      "Over-the-Air Updates",
    ],
    location: "San Francisco, CA",
    isAvailable: true,
    mileage: 18000,
    color: "Silver",
    licensePlate: "CA-005",
  },
  {
    make: "Jeep",
    modelName: "Wrangler",
    year: 2022,
    type: "suv",
    transmission: "manual",
    fuelType: "gasoline",
    seats: 4,
    doors: 4,
    pricePerDay: 75,
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
    ],
    description:
      "Rugged off-road vehicle perfect for adventure seekers and outdoor enthusiasts.",
    features: [
      "4WD",
      "Removable Doors",
      "Fold-Down Windshield",
      "Rock Rails",
      "Skid Plates",
    ],
    location: "Denver, CO",
    isAvailable: true,
    mileage: 25000,
    color: "Green",
    licensePlate: "CO-006",
  },
  {
    make: "Porsche",
    modelName: "911",
    year: 2023,
    type: "sports",
    transmission: "automatic",
    fuelType: "gasoline",
    seats: 2,
    doors: 2,
    pricePerDay: 300,
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    ],
    description:
      "Iconic sports car delivering unmatched performance and driving experience.",
    features: [
      "Sport Chrono",
      "PASM",
      "Sport Exhaust",
      "Ceramic Brakes",
      "Launch Control",
    ],
    location: "Las Vegas, NV",
    isAvailable: true,
    mileage: 5000,
    color: "Yellow",
    licensePlate: "NV-007",
  },
  {
    make: "Volkswagen",
    modelName: "Golf",
    year: 2022,
    type: "hatchback",
    transmission: "manual",
    fuelType: "gasoline",
    seats: 5,
    doors: 5,
    pricePerDay: 55,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
    ],
    description:
      "Versatile hatchback with excellent handling and practical cargo space.",
    features: [
      "Manual Transmission",
      "Hatchback Design",
      "Digital Cockpit",
      "Adaptive Headlights",
      "Parking Sensors",
    ],
    location: "Seattle, WA",
    isAvailable: false,
    mileage: 28000,
    color: "Gray",
    licensePlate: "WA-008",
  },
];

const seedDatabase = async () => {
  try {
    await connectMongo();
    console.log("Connected to MongoDB");

    // Clear existing data
    console.log("Clearing existing data...");
    await Promise.all([
      User.deleteMany({}),
      Car.deleteMany({}),
      Booking.deleteMany({}),
      Review.deleteMany({}),
    ]);

    // Create users
    console.log("Creating users...");
    const users = [];
    for (const userData of testUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      users.push(user);
    }
    console.log(`Created ${users.length} users`);

    // Create cars
    console.log("Creating cars...");
    const cars = await Car.insertMany(testCars);
    console.log(`Created ${cars.length} cars`);

    // Create bookings
    console.log("Creating bookings...");
    const bookings = [];
    const bookingData = [
      {
        userId: users[1]._id, // John Doe
        carId: cars[0]._id, // Toyota Camry
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-01-18"),
        totalPrice: 195, // 3 days * 65
        status: "completed",
        pickupLocation: "New York, NY",
        dropoffLocation: "New York, NY",
        notes: "Great experience with the Toyota Camry!",
      },
      {
        userId: users[2]._id, // Jane Smith
        carId: cars[1]._id, // Ford Explorer
        startDate: new Date("2024-01-20"),
        endDate: new Date("2024-01-25"),
        totalPrice: 425, // 5 days * 85
        status: "completed",
        pickupLocation: "Los Angeles, CA",
        dropoffLocation: "Los Angeles, CA",
        notes: "Perfect for our family vacation.",
      },
      {
        userId: users[3]._id, // Mike Johnson
        carId: cars[2]._id, // Honda Civic
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-02-03"),
        totalPrice: 90, // 2 days * 45
        status: "completed",
        pickupLocation: "Chicago, IL",
        dropoffLocation: "Chicago, IL",
      },
      {
        userId: users[1]._id, // John Doe
        carId: cars[3]._id, // BMW X5
        startDate: new Date("2024-02-10"),
        endDate: new Date("2024-02-12"),
        totalPrice: 300, // 2 days * 150
        status: "confirmed",
        pickupLocation: "Miami, FL",
        dropoffLocation: "Miami, FL",
        notes: "Looking forward to driving this luxury SUV.",
      },
      {
        userId: users[4]._id, // Sarah Wilson
        carId: cars[4]._id, // Tesla Model 3
        startDate: new Date("2024-02-15"),
        endDate: new Date("2024-02-20"),
        totalPrice: 475, // 5 days * 95
        status: "pending",
        pickupLocation: "San Francisco, CA",
        dropoffLocation: "San Francisco, CA",
        notes: "First time renting an electric car!",
      },
      {
        userId: users[2]._id, // Jane Smith
        carId: cars[5]._id, // Jeep Wrangler
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-03-05"),
        totalPrice: 300, // 4 days * 75
        status: "confirmed",
        pickupLocation: "Denver, CO",
        dropoffLocation: "Denver, CO",
        notes: "Planning a mountain adventure!",
      },
    ];

    for (const booking of bookingData) {
      const newBooking = await Booking.create(booking);
      bookings.push(newBooking);
    }
    console.log(`Created ${bookings.length} bookings`);

    // Create reviews (only for completed bookings)
    console.log("Creating reviews...");
    const completedBookings = bookings.filter((b) => b.status === "completed");
    const reviews = [];

    const reviewData = [
      {
        userId: users[1]._id, // John Doe
        carId: cars[0]._id, // Toyota Camry
        bookingId: completedBookings[0]._id,
        rating: 5,
        comment:
          "Excellent car! Very fuel efficient and comfortable for city driving. The hybrid system worked perfectly and the car was spotless when I picked it up.",
        isApproved: true,
        isHidden: false,
      },
      {
        userId: users[2]._id, // Jane Smith
        carId: cars[1]._id, // Ford Explorer
        bookingId: completedBookings[1]._id,
        rating: 4,
        comment:
          "Great family SUV with plenty of space for our luggage and kids. The third row seating was very useful. Only minor complaint was the fuel consumption in city traffic.",
        isApproved: true,
        isHidden: false,
      },
      {
        userId: users[3]._id, // Mike Johnson
        carId: cars[2]._id, // Honda Civic
        bookingId: completedBookings[2]._id,
        rating: 5,
        comment:
          "Perfect city car! The manual transmission was smooth and the car handled beautifully. Great value for money and excellent fuel economy.",
        isApproved: true,
        isHidden: false,
      },
    ];

    for (const review of reviewData) {
      const newReview = await Review.create(review);
      reviews.push(newReview);
    }
    console.log(`Created ${reviews.length} reviews`);

    // Update car ratings based on reviews
    console.log("Updating car ratings...");
    for (const car of cars) {
      const carReviews = reviews.filter(
        (r) => r.carId.toString() === car._id.toString()
      );
      if (carReviews.length > 0) {
        const averageRating =
          carReviews.reduce((sum, review) => sum + review.rating, 0) /
          carReviews.length;
        await Car.findByIdAndUpdate(car._id, {
          averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
          totalReviews: carReviews.length,
        });
      }
    }

    console.log("\n🎉 Database seeded successfully!");
    console.log("\nTest accounts created:");
    console.log("📧 Admin: admin@carrental.com / admin123");
    console.log("📧 User: john.doe@example.com / password123");
    console.log("📧 User: jane.smith@example.com / password123");
    console.log("📧 User: mike.johnson@example.com / password123");
    console.log("📧 User: sarah.wilson@example.com / password123");

    console.log("\nData summary:");
    console.log(`✅ ${users.length} users created`);
    console.log(`✅ ${cars.length} cars created`);
    console.log(`✅ ${bookings.length} bookings created`);
    console.log(`✅ ${reviews.length} reviews created`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
};

// Export the seed function
export default seedDatabase;

// Allow running this file directly
if (require.main === module) {
  seedDatabase();
}
