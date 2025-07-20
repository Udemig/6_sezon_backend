import { Order } from "@/lib/models/Order";
import connectMongo from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Order ID is required" },
        { status: 400 }
      );
    }

    await connectMongo();

    const order = await Order.findById(id).populate("product");

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: "success",
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
