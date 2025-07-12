import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Booking from "@/lib/models/Booking";
import { requireAuth } from "@/lib/middleware/auth";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(request);
    if (user instanceof NextResponse) {
      return user;
    }

    const { id } = params;

    await connectMongo();

    const booking = await Booking.findById(id)
      .populate("carId", "make modelName images pricePerDay location")
      .populate("userId", "firstName lastName email")
      .lean();

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check if booking belongs to user or user is admin
    if ((booking as any).userId._id.toString() !== user.id && !user.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({
      booking,
    });
  } catch (error) {
    console.error("Get booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(request);
    if (user instanceof NextResponse) {
      return user;
    }

    const { id } = params;
    const body = await request.json();

    await connectMongo();

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check if booking belongs to user or user is admin
    if (booking.userId.toString() !== user.id && !user.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Update booking
    const updatedBooking = await Booking.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate("carId", "make modelName images pricePerDay location");

    return NextResponse.json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(request);
    if (user instanceof NextResponse) {
      return user;
    }

    const { id } = params;

    await connectMongo();

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check if booking belongs to user or user is admin
    if (booking.userId.toString() !== user.id && !user.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Only allow cancellation if booking is pending or confirmed
    if (!["pending", "confirmed"].includes(booking.status)) {
      return NextResponse.json(
        { error: "Cannot cancel this booking" },
        { status: 400 }
      );
    }

    // Update booking status to cancelled
    await Booking.findByIdAndUpdate(id, { status: "cancelled" });

    return NextResponse.json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("Delete booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
