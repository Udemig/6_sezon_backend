import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectMongo from "@/lib/mongodb";
import Booking from "@/lib/models/Booking";
import Car from "@/lib/models/Car";
import { requireAuth } from "@/lib/middleware/auth";

const bookingSchema = z.object({
  carId: z.string().min(1, "Car ID is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  totalPrice: z.number().min(0, "Total price must be positive"),
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().min(1, "Drop-off location is required"),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (user instanceof NextResponse) {
      return user;
    }

    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    await connectMongo();

    // Check if car exists and is available
    const car = await Car.findById(validatedData.carId);
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    if (!car.isAvailable) {
      return NextResponse.json(
        { error: "Car is not available" },
        { status: 400 }
      );
    }

    // Check for date conflicts
    const conflictingBookings = await Booking.find({
      carId: validatedData.carId,
      status: { $in: ["pending", "confirmed"] },
      $or: [
        {
          startDate: { $lte: new Date(validatedData.endDate) },
          endDate: { $gte: new Date(validatedData.startDate) },
        },
      ],
    });

    if (conflictingBookings.length > 0) {
      return NextResponse.json(
        { error: "Car is not available for the selected dates" },
        { status: 400 }
      );
    }

    // Create booking
    const booking = new Booking({
      userId: user.id,
      carId: validatedData.carId,
      startDate: new Date(validatedData.startDate),
      endDate: new Date(validatedData.endDate),
      totalPrice: validatedData.totalPrice,
      pickupLocation: validatedData.pickupLocation,
      dropoffLocation: validatedData.dropoffLocation,
      notes: validatedData.notes,
    });

    await booking.save();

    // Populate car and user details
    await booking.populate([
      { path: "carId", select: "make modelName images pricePerDay" },
      { path: "userId", select: "firstName lastName email" },
    ]);

    return NextResponse.json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Create booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (user instanceof NextResponse) {
      return user;
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    await connectMongo();

    // Build filter
    const filter: any = { userId: user.id };
    if (status) {
      filter.status = status;
    }

    // Get bookings with pagination
    const skip = (page - 1) * limit;
    const bookings = await Booking.find(filter)
      .populate("carId", "make modelName images pricePerDay location")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const totalBookings = await Booking.countDocuments(filter);
    const totalPages = Math.ceil(totalBookings / limit);

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        totalPages,
        totalBookings,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
