import { Ticket } from "@/types";
import { FC } from "react";
import PriorityBadge from "./priority-badge";
import DeleteButton from "./delete-button";
import Link from "next/link";
import ProgressBar from "./progress-bar";
import { Calendar, Clock } from "lucide-react";
import StatusBadge from "./status-badge";
import { DATE_FORMATS } from "@/utils/constants";

interface Props {
  ticket: Ticket;
}

const TicketCard: FC<Props> = ({ ticket }) => {
  const createdDate = new Date(ticket.createdAt).toLocaleDateString("tr", DATE_FORMATS.display);
  const updatedDate = new Date(ticket.updatedAt).toLocaleDateString("tr", DATE_FORMATS.short);

  const isRecent = new Date(ticket.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000);

  return (
    <div className="group bg-zinc-800 rounded-xl shadow-sm hover:shadow-md shadow-zinc-900/20 transition border border-zinc-700 hover:border-zinc-600 overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={ticket.priority} />
            {isRecent && <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Yeni</div>}
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition">
            <DeleteButton id={ticket.id} />
          </div>
        </div>

        {/* Title & Desc */}
        <Link href={`/ticket/${ticket.id}`} className="block">
          <h3 className="font-semibold text-gray-100 mb-2 line-clamp-1 group-hover:text-blue-400 transition">
            {ticket.title}
          </h3>

          <p className="text-gray-300 text-sm line-clamp-2 mb-3">{ticket.description}</p>
        </Link>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-md">{ticket.category}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <ProgressBar progress={ticket.progress} />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-zinc-800/50 border-t border-zinc-700">
        <div className="flex items-center justify-between">
          {/* Tarih verisi */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="size-3" />
              <span>Oluşturuldu: {createdDate}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="size-3" />
              <span>Güncellendi: {updatedDate}</span>
            </div>
          </div>

          {/* Status Badge */}
          <StatusBadge status={ticket.status} />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
