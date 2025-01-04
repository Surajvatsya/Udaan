// OrderTrendsChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

export const OrderTrendsChart = ({ orderData }) => {
  const data = {
    labels: orderData.map((entry) => entry.date), // Dates for x-axis
    datasets: [
      {
        label: "Orders",
        data: orderData.map((entry) => entry.count), // Order counts for y-axis
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1, // Line smoothness
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Orders",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Trends</h3>
      <Line data={data} options={options} />
    </div>
  );
};
