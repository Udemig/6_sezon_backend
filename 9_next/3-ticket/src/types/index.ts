export type CategoryType = {
  "Yazılım Sorunu"?: number;
  "Donanım Sorunu"?: number;
  "Bağlantı Sorunu"?: number;
  Diğer?: number;
};

export type StatusType = {
  "Devam Ediyor"?: number;
  Beklemede?: number;
  Çözüldü?: number;
};

export type Statistics = {
  totalTickets: number;
  ticketsByCategory: CategoryType;
  ticketsByStatus: StatusType;
  completionRate: number;
  criticalTickets: number;
  ticketsCreatedToday: number;
  ticketsCreatedThisWeek: number;
  ticketsCreatedThisMonth: number;
  ticketsCreatedThisYear: number;
  averagePriority: number;
};

export type TicketCategory = "Yazılım Sorunu" | "Donanım Sorunu" | "Bağlantı Sorunu" | "Diğer";

export type TicketStatus = "Devam Ediyor" | "Beklemede" | "Çözüldü";

export type Ticket = {
  title: string;
  description: string;
  category: TicketCategory;
  priority: number;
  progress: number;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type StatisticsReponse = Promise<Statistics>;

export type TicketResponse = Promise<{
  message: string;
  ticket: Ticket;
}>;

export type TicketsResponse = Promise<{
  message: string;
  tickets: Ticket[];
}>;

export type MessageResponse = Promise<{
  message: string;
}>;
