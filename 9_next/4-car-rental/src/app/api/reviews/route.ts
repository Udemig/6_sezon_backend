import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectMongo from "@/lib/mongodb";
import Review from "@/lib/models/Review";
import Car from "@/lib/models/Car";
import { Order } from "@/lib/models/Order";
import { getCurrentUser } from "@/lib/auth-utils";

const reviewSchema = z.object({
  carId: z.string().min(1, "Car ID is required"),
  orderId: z.string().optional(),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = reviewSchema.parse(body);

    await connectMongo();

    // Check if car exists
    const car = await Car.findById(validatedData.carId);
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Find a paid order for this user and car
    const order = await Order.findOne({
      user: user.id,
      product: validatedData.carId,
      status: "paid",
    }).sort({ createdAt: -1 });

    if (!order) {
      return NextResponse.json(
        { error: "You can only review cars you have rented" },
        { status: 400 }
      );
    }

    // Check if user has already reviewed this order
    const existingReview = await Review.findOne({
      userId: user.id,
      orderId: order._id,
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this order" },
        { status: 400 }
      );
    }

    // Create review
    const review = new Review({
      userId: user.id,
      carId: validatedData.carId,
      orderId: order._id,
      rating: validatedData.rating,
      comment: validatedData.comment,
      isApproved: true,
    });

    await review.save();

    // Update car's average rating
    const reviews = await Review.find({
      carId: validatedData.carId,
      isApproved: true,
    });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    await Car.findByIdAndUpdate(validatedData.carId, {
      averageRating: averageRating,
      totalReviews: reviews.length,
    });

    return NextResponse.json({
      message: "Review submitted successfully and is pending approval",
      review,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Create review error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get("carId");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    await connectMongo();

    // Build filter
    const filter: any = { isApproved: true, isHidden: false };
    if (carId) {
      filter.carId = carId;
    }

    // Get reviews with pagination
    const skip = (page - 1) * limit;
    const reviews = await Review.find(filter)
      .populate("userId", "firstName lastName")
      .populate("carId", "make modelName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const totalReviews = await Review.countDocuments(filter);
    const totalPages = Math.ceil(totalReviews / limit);

    return NextResponse.json({
      reviews,
      pagination: {
        page,
        limit,
        totalPages,
        totalReviews,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
