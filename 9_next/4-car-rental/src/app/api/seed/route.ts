import { NextResponse } from "next/server";
import seedDatabase from "@/lib/seed";

export async function POST() {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Seed endpoint only available in development" },
      { status: 403 }
    );
  }

  try {
    await seedDatabase();
    return NextResponse.json({
      message: "Database seeded successfully!",
      data: {
        users: 5,
        cars: 8,
        bookings: 6,
        reviews: 3,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      {
        error: "Failed to seed database",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Seed endpoint",
    usage: "POST to this endpoint to seed the database",
    note: "Only available in development mode",
  });
}
