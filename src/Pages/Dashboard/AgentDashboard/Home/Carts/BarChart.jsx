import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Registrations",
        data: [400, 300, 200, 278, 189, 239],
        backgroundColor: "#10b981", // Tailwind Green-500
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
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Registrations</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
