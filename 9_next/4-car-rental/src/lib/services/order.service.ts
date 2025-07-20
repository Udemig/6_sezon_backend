import { Order } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export interface OrdersResponse {
  message?: string;
  status: string;
  orders: Order[];
}

export interface OrderResponse {
  message?: string;
  status: string;
  order: Order;
}

export async function getOrders(userId: string): Promise<OrdersResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/orders?userId=${userId}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

export async function getOrderById(orderId: string): Promise<OrderResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order");
  }
}
