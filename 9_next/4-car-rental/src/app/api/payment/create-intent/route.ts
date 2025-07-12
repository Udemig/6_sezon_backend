import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectMongo from "@/lib/mongodb";
import Booking from "@/lib/models/Booking";
import { requireAuth } from "@/lib/middleware/auth";
import { createPaymentIntent } from "@/lib/stripe";

const paymentIntentSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (user instanceof NextResponse) {
      return user;
    }

    const body = await request.json();
    const validatedData = paymentIntentSchema.parse(body);

    await connectMongo();

    // Get booking
    const booking = await Booking.findById(validatedData.bookingId)
      .populate("carId", "make modelName")
      .populate("userId", "firstName lastName email");

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Verify booking belongs to user
    if (booking.userId._id.toString() !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Check if booking is in correct status
    if (booking.status !== "pending") {
      return NextResponse.json(
        { error: "Booking cannot be paid for" },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await createPaymentIntent(booking.totalPrice, "usd", {
      bookingId: booking._id.toString(),
      userId: user.id,
      carId: booking.carId._id.toString(),
    });

    // Update booking with payment intent ID
    await Booking.findByIdAndUpdate(validatedData.bookingId, {
      paymentIntentId: paymentIntent.id,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Create payment intent error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
