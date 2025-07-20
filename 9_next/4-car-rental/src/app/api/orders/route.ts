import { Order } from "@/lib/models/Order";
import connectMongo from "@/lib/mongodb";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export async function GET(req: NextRequestWithAuth) {
  try {
    // 1) veritabanına bağlan
    await connectMongo();

    // 2) kullanıcı oturum verisini al
    const userId = req.nextUrl.searchParams.get("userId");

    // 1.1) kullanıcı oturum verisi yoksa hata dön
    if (!userId) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // 2) kullanıcıya ait sipariş verisini al
    const orders = await Order.find({ user: userId }).populate("product");

    // 3) sipariş verisini dön
    return NextResponse.json({
      status: "success",
      orders,
    });
  } catch (error) {
    // 4) hata dön
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
