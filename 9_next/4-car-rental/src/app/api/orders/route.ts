import { getCurrentUser } from "@/lib/auth-utils";
import { Order } from "@/lib/models/Order";
import connectMongo from "@/lib/mongodb";
import { NextResponse } from "next/server";

//! TODO ÇALIŞMIYOR..
export async function GET(req: Request) {
  try {
    // 1) veritabanına bağlan
    await connectMongo();

    // 2) kullanıcı oturum verisini al
    const user = await getCurrentUser(req);

    // 1.1) kullanıcı oturum verisi yoksa hata dön
    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // 2) kullanıcıya ait sipariş verisini al
    const orders = await Order.find({ user: user.id }).populate("product");

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
