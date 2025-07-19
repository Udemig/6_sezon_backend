import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Car from "@/lib/models/Car";
import Review from "@/lib/models/Review";
import { RouteParams } from "@/types";

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    await connectMongo();

    const car = await Car.findById(id).lean();

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Get reviews for this car
    const reviews = await Review.find({
      carId: id,
      isApproved: true,
      isHidden: false,
    })
      .populate("userId", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return NextResponse.json({
      car,
      reviews,
    });
  } catch (error) {
    console.error("Get car error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();

    await connectMongo();

    const car = await Car.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Car updated successfully",
      car,
    });
  } catch (error) {
    console.error("Update car error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    await connectMongo();

    const car = await Car.findByIdAndDelete(id);

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Car deleted successfully",
    });
  } catch (error) {
    console.error("Delete car error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
