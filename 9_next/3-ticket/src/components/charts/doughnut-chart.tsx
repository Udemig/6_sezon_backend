"use client";

import { FC } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

interface Props {
  value: Record<string, number>;
}

const DoughnutChart: FC<Props> = ({ value }) => {
  const data = {
    labels: Object.keys(value),
    datasets: [
      {
        label: "Ticket Sayısı",
        data: Object.values(value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-700 hover:shadow-md grid place-items-center">
      <Doughnut data={data} className="w-full h-full" />
    </div>
  );
};

export default DoughnutChart;
