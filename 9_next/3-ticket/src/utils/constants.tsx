import { House, Ticket, Plus, Users, Mail, ChartArea } from "lucide-react";

export const navigationItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: House,
  },
  {
    label: "Tickets",
    href: "/tickets",
    icon: Ticket,
  },
  {
    label: "Yeni Ticket",
    href: "/tickets/add",
    icon: Plus,
  },
  {
    label: "Takımlar",
    href: "#",
    icon: Users,
  },
  {
    label: "Gelen Kutusu",
    href: "#",
    icon: Mail,
  },
  {
    label: "İstatistikler",
    href: "#",
    icon: ChartArea,
  },
];
