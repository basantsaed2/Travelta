import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Users",
        data: [4000, 3000, 2000, 2780, 1890, 2390],
        borderColor: "#3b82f6", // Tailwind Blue-500
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Blue-500 with transparency
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151", // Tailwind Gray-700
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#374151" }, // Tailwind Gray-700
      },
      y: {
        ticks: { color: "#374151" }, // Tailwind Gray-700
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">User Growth</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
