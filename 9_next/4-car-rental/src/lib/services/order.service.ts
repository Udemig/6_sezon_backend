import { Order } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export interface OrdersResponse {
  message?: string;
  status: string;
  orders: Order[];
}

export async function getOrders(): Promise<OrdersResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/orders`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: OrdersResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
