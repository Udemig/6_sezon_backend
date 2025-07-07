import { MessageResponse, StatisticsReponse, TicketResponse, TicketsResponse } from "@/types";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const wait = async (ms: number = 1500) => {
  return await new Promise((resolve, reject) => setTimeout(() => resolve, ms));
};

export const getStatistics = async (): StatisticsReponse => {
  const res = await fetch(`${APP_URL}/api/statistics`, {
    cache: "no-store", // cache kullanmaz
  });

  return res.json();
};

export const getTickets = async (): TicketsResponse => {
  const res = await fetch(`${APP_URL}/api/tickets`, {
    cache: "no-store", // cache kullanmaz
  });

  return res.json();
};

export const deleteTicket = async (id: string): MessageResponse => {
  const res = await fetch(`${APP_URL}/api/tickets/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

export const getTicket = async (id: string): TicketResponse => {
  const res = await fetch(`${APP_URL}/api/tickets/${id}`, {});

  return res.json();
};
