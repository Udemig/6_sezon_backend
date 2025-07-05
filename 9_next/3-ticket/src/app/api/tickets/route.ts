import connectMongo from "@/utils/connect-mongo";
import Ticket from "../models/ticket";
import { NextResponse as Res } from "next/server";

export async function GET() {
  try {
    // veritabanına bağlan
    await connectMongo();

    // ticket verilerini al
    const tickets = await Ticket.find();

    return Res.json({
      message: "Ticket verileri alındı",
      tickets,
    });
  } catch (error) {
    return Res.json(
      {
        message: "Ticket verileri alınırken bir sorun oluştu",
        error: (error instanceof Error && error.message) || "Bilinmeyen hata!",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // isteği body kısmındaki veriyi al
    const body = await req.json();

    // veritbanına yeni ticket'ı kaydet
    const newTicket = await Ticket.create(body);

    return Res.json({
      message: "Ticket oluşturuldu",
      ticket: newTicket,
    });
  } catch (error: any) {
    return Res.json(
      {
        message: "Ticket verisi oluşturulurken bir sorun oluştu",
        error: (error instanceof Error && error.message) || "Bilinmeyen hata!",
      },
      { status: 500 }
    );
  }
}
