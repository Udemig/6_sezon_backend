import connectMongo from "@/utils/connect-mongo";
import Ticket from "../models/ticket";
import { NextResponse as Res } from "next/server";

export async function GET() {
  try {
    // veritbanına bağlan
    await connectMongo();

    // veritabanından ticket'ları al
    const tickets = await Ticket.find();

    // toplam ticket saysı
    const totalTickets = tickets.length;

    // kategoriye göre dağılım
    const ticketsByCategory = tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {});

    // statuse göre dağılım
    const ticketsByStatus = tickets.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {});

    // çözüm oranı
    const completedTickets = tickets.filter((ticket) => ticket.status === "Çözüldü").length;
    const completionRate = Number(totalTickets > 0 ? Number((completedTickets / totalTickets) * 100).toFixed(1) : 0);

    // kritik önelikli ticketları al
    const criticalTickets = tickets.filter((ticket) => ticket.priority >= 4).length;

    // tarihleri hesapla
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisYear = new Date(now.getFullYear(), 0, 1);

    // tarihe göre hsapla
    const ticketsCreatedToday = tickets.filter((ticket) => new Date(ticket.createdAt) >= today).length;
    const ticketsCreatedThisWeek = tickets.filter((ticket) => new Date(ticket.createdAt) >= thisWeek).length;
    const ticketsCreatedThisMonth = tickets.filter((ticket) => new Date(ticket.createdAt) >= thisMonth).length;
    const ticketsCreatedThisYear = tickets.filter((ticket) => new Date(ticket.createdAt) >= thisYear).length;

    // ortalama öncelik hesapla
    const averagePriority = Number(
      (tickets.reduce((acc, ticket) => acc + ticket.priority, 0) / totalTickets).toFixed(1)
    );

    return Res.json({
      totalTickets,
      ticketsByCategory,
      ticketsByStatus,
      completionRate,
      criticalTickets,
      ticketsCreatedToday,
      ticketsCreatedThisWeek,
      ticketsCreatedThisMonth,
      ticketsCreatedThisYear,
      averagePriority,
    });
  } catch (error) {
    return Res.json({ message: "Bir sorun oluştu" }, { status: 500 });
  }
}
