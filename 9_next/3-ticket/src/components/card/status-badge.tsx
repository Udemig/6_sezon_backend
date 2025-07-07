import { STATUS_COLORS } from "@/utils/constants";
import { FC } from "react";

interface Props {
  status: "Çözüldü" | "Devam Ediyor" | "Beklemede";
}

const StatusBadge: FC<Props> = ({ status }) => {
  const color = STATUS_COLORS[status];

  return <div className={`${color} text-white px-3 py-1 text-xs rounded-full`}>{status}</div>;
};

export default StatusBadge;
