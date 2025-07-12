import { TrendingUp } from "lucide-react";
import { FC, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  value: number | string;
}

const DashboarValue: FC<Props> = ({ icon, label, value }) => {
  return (
    <div className="bg-zinc-900 rounded-xl shadow-sm border-zinc-700  hover:shadow-md transition group p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 size-5">{icon}</div>
        <h3 className="text-sm text-gray-400">{label}</h3>
      </div>

      <div className="text-3xl font-bold text-gray-100 mb-1">{value}</div>
    </div>
  );
};

export default DashboarValue;
