import { getTickets } from "@/utils/service";
import TicketCard from "@/components/card";

const TicketsGrid = async () => {
  const { tickets } = await getTickets();

  // ticket'ların kategorilini benzersiz bir dizi olarak tanımla
  const categories = [...new Set(tickets.map((i) => i.category))].sort();

  return (
    <div className="space-y-8">
      {categories.map((category, key) => {
        const categoryTickets = tickets.filter((ticket) => ticket.category === category);

        return (
          <div className="mb-8" key={key}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-500 rounded-full" />
                {category}
              </h2>

              <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                {categoryTickets.length} ticket
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-">
              {categoryTickets.map((ticket) => (
                <TicketCard ticket={ticket} key={ticket.id} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketsGrid;
