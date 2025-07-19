import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectMongo from "@/lib/mongodb";
import Car from "@/lib/models/Car";
import { CarType, TransmissionType, FuelType } from "@/types";

const querySchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  transmission: z.string().optional(),
  fuelType: z.string().optional(),
  seats: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryData = {
      search: searchParams.get("search") || undefined,
      type: searchParams.get("type") || undefined,
      location: searchParams.get("location") || undefined,
      minPrice: searchParams.get("minPrice") || undefined,
      maxPrice: searchParams.get("maxPrice") || undefined,
      transmission: searchParams.get("transmission") || undefined,
      fuelType: searchParams.get("fuelType") || undefined,
      seats: searchParams.get("seats") || undefined,
      limit: searchParams.get("limit") || "12",
      page: searchParams.get("page") || "1",
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: searchParams.get("sortOrder") || "desc",
    };

    const validatedData = querySchema.parse(queryData);

    await connectMongo();

    // Build filter object
    const filter: any = { isAvailable: true };

    if (validatedData.search) {
      filter.$or = [
        { make: { $regex: validatedData.search, $options: "i" } },
        { modelName: { $regex: validatedData.search, $options: "i" } },
        { description: { $regex: validatedData.search, $options: "i" } },
      ];
    }

    if (validatedData.type) {
      filter.type = validatedData.type;
    }

    if (validatedData.location) {
      filter.location = { $regex: validatedData.location, $options: "i" };
    }

    if (validatedData.minPrice || validatedData.maxPrice) {
      filter.pricePerDay = {};
      if (validatedData.minPrice) {
        filter.pricePerDay.$gte = parseFloat(validatedData.minPrice);
      }
      if (validatedData.maxPrice) {
        filter.pricePerDay.$lte = parseFloat(validatedData.maxPrice);
      }
    }

    if (validatedData.transmission) {
      filter.transmission = validatedData.transmission;
    }

    if (validatedData.fuelType) {
      filter.fuelType = validatedData.fuelType;
    }

    if (validatedData.seats) {
      filter.seats = parseInt(validatedData.seats);
    }

    // Pagination
    const limit = parseInt(validatedData.limit || "12");
    const page = parseInt(validatedData.page || "1");
    const skip = (page - 1) * limit;

    // Sorting
    const sort: any = {};
    if (validatedData.sortBy) {
      sort[validatedData.sortBy] = validatedData.sortOrder === "asc" ? 1 : -1;
    }

    // Get cars with pagination
    const cars = await Car.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const totalCars = await Car.countDocuments(filter);
    const totalPages = Math.ceil(totalCars / limit);

    return NextResponse.json({
      cars,
      pagination: {
        page,
        limit,
        totalPages,
        totalCars,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Get cars error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const carSchema = z.object({
      make: z.string().min(1),
      modelName: z.string().min(1),
      year: z
        .number()
        .min(1990)
        .max(new Date().getFullYear() + 1),
      type: z.enum(["sedan", "suv", "hatchback", "sports", "luxury"]),
      transmission: z.enum(["manual", "automatic"]),
      fuelType: z.enum(["gasoline", "diesel", "hybrid", "electric"]),
      seats: z.number().min(2).max(8),
      doors: z.number().min(2).max(5),
      pricePerDay: z.number().min(0),
      images: z.array(z.string()).min(1),
      description: z.string().min(10),
      features: z.array(z.string()).optional(),
      location: z.string().min(1),
      mileage: z.number().min(0),
      color: z.string().min(1),
      licensePlate: z.string().min(1),
    });

    const validatedData = carSchema.parse(body);

    await connectMongo();

    const car = new Car(validatedData);
    await car.save();

    return NextResponse.json({
      message: "Car created successfully",
      car,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Create car error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
