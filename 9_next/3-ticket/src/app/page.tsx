import DashboarValue from "@/components/charts/dashboard-value";
import DoughnutChart from "@/components/charts/doughnut-chart";
import { getStatistics } from "@/utils/service";
import { BarChart3, PieChart, TrendingUp } from "lucide-react";

import { FC } from "react";

const Home: FC = async () => {
  const data = await getStatistics();

  console.log(data);

  return (
    <div className="p-2 md:p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Dashboard</h1>
        <p className="text-gray-400">Ticket yönetim sistemimizin genel durumu ve analizi</p>
      </div>

      <div className="space-y-8">
        <div className="grid lg:grid-cols-2 gap-5">
          <div>
            <h2 className="font-semibold mb-2 text-lg">Kategori Dağılımı</h2>
            <DoughnutChart value={data.ticketsByCategory} />
          </div>

          <div>
            <h2 className="font-semibold mb-2 text-lg">Durum Dağılımı</h2>

            <DoughnutChart value={data.ticketsByStatus} />
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2 text-lg">Zaman Bazlı Analiz</h2>

          <div className="grid md:grid-cols-3 gap-5">
            <DashboarValue
              icon={<TrendingUp className="text-green-500" />}
              label="Bugün"
              value={data.ticketsCreatedToday}
            />
            <DashboarValue
              icon={<BarChart3 className="text-blue-500" />}
              label="Bu Hafta"
              value={data.ticketsCreatedThisWeek}
            />
            <DashboarValue
              icon={<PieChart className="text-purple-500" />}
              label="Bu Yıl"
              value={data.ticketsCreatedThisYear}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
