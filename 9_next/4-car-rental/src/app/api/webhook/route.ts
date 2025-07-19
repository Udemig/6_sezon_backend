import { Order } from "@/lib/models/Order";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
});

/*
 * Stripte'ta gerçekleşen olayarda (ödeme başarılı, iptal edildi, vs). veritbanımızı güncellemek isteyebiliriz.

 * Bunun için webhook'u kullanabiliriz.

 * Ödeme sayfasında gerçekleşen eyleme bağlı olarak stripe bu endpoint'e bir istek gönderir.
 */
export async function POST(params: Request) {
  try {
    // 1) isteğin body kısmında gelen ödeme ile alakalı verileri al
    const body = await params.json();

    // 2) stripe'ın gönderdiği event bilgisine eriş
    const session = body.data.object as Stripe.Checkout.Session;

    // 3) sipariş verisini al
    const orderId = session.metadata?.orderId;

    // 4) sipariş verisi yoksa hata dön
    if (!orderId) {
      return NextResponse.json(
        { message: "Sipariş bulunamadı" },
        { status: 404 }
      );
    }

    // 4) ödeme başarılı olursa sipariş verisini güncelle
    if (body.type === "checkout.session.completed") {
      await Order.findByIdAndUpdate(orderId, {
        status: "paid",
      });
    } else if (body.data.object.status === "failed") {
      // iptal edildiyse sipariş verisini güncelle
      await Order.findByIdAndUpdate(orderId, {
        status: "cancelled",
      });
    }

    return NextResponse.json({
      status: "success",
    });
  } catch (error) {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
