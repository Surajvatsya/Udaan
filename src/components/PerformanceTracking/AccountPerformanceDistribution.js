import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const AccountPerformanceDistribution = ({ timePeriod }) => {
  const [revenueData, setRevenueData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          `http://13.127.185.23:4000/api/leads/revenue_contribution?days=${timePeriod}`,
          {
            headers: {
              token: token,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch revenue contribution");
        }
        const data = await response.json();

        // Extract labels and revenue data for the chart
        const newLabels = data.map((item) => item.restaurantName);
        const newRevenueData = data.map((item) =>
          parseFloat(item.totalRevenue),
        );

        setLabels(newLabels);
        setRevenueData(newRevenueData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching revenue data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [timePeriod]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: revenueData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FFA726",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FFA726",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `₹${value.toLocaleString()}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div
      className="bg-white p-6 rounded"
      style={{ height: "300px", width: "300px" }}
    >
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export const TopPerformingAccounts = ({ accounts = [] }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-lg font-bold text-blue-900 mb-4">
      Top Performing Accounts
    </h3>
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="border-b py-2">Account Name</th>
          <th className="border-b py-2">Orders</th>
          <th className="border-b py-2">Revenue</th>
        </tr>
      </thead>
      <tbody>
        {accounts.length > 0 ? (
          accounts.map((account, index) => (
            <tr key={index}>
              <td className="py-2">{account.name}</td>
              <td className="py-2">{account.totalOrders}</td>
              <td className="py-2">₹{account.totalRevenue}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="py-2 text-center" colSpan="3">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export const AtRiskAccounts = ({ accounts }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-lg font-bold text-blue-900 mb-4">At-Risk Accounts</h3>
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="border-b py-2">Account Name</th>
        </tr>
      </thead>
      <tbody>
        {accounts.length > 0 ? (
          accounts.map((account, index) => (
            <tr key={index}>
              <td className="py-2">{account.name}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="py-2 text-center">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// TimePeriodSelector.js
export const TimePeriodSelector = ({ onChange }) => (
  <select
    className="bg-gray-200 p-2 rounded"
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="7">Last 7 Days</option>
    <option value="30">Last 30 Days</option>
    <option value="365">Last Year</option>
  </select>
);
