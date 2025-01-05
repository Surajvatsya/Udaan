import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

const RestaurantDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("Timeline");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [heatmapData, setHeatmap] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [orderData, setOrderData] = useState([]); // New state for orders
  const [pocData, setPocData] = useState([]); // New state for POCs
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/leads/${id}`, {
          method: "GET",
          headers: {
            token,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant details");
        }
        const data = await response.json();
        setRestaurant(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchPocData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/contacts/${id}`,
          {
            method: "GET",
            headers: {
              token,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch POC data");
        }
        const data = await response.json();
        setPocData(data);
      } catch (err) {
        console.error("Error fetching POC data:", err);
      }
    };

    fetchPocData();
  }, [id]);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/order/heatmap/${id}`,
          {
            method: "GET",
            headers: {
              token,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch heatmap data");
        }
        const data = await response.json();
        setHeatmap(data);
      } catch (err) {
        console.error("Error fetching heatmap data:", err);
      }
    };

    fetchHeatmapData();
  }, [id]);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/interactions/${id}`,
          {
            method: "GET",
            headers: {
              token,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch timeline data");
        }
        const data = await response.json();
        setTimelineData(data);
      } catch (err) {
        console.error("Error fetching timeline data:", err);
      }
    };
    const fetchOrderData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/order/${id}`, {
          method: "GET",
          headers: {
            token,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch order data");
        }
        const data = await response.json();
        setOrderData(data); // Set order data dynamically
      } catch (err) {
        console.error("Error fetching order data:", err);
      }
    };

    fetchOrderData();

    // fetchRestaurantDetails();
    fetchTimelineData();
  }, [id]);



  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Restaurant Info Card */}
      <div className="sticky top-0 z-10 bg-blue-500 text-white p-6 shadow-md">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center">{restaurant.name}</h2>
          <div className="flex justify-between w-full mt-2">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c.83 0 1.5-.67 1.5-1.5S12.83 8 12 8s-1.5.67-1.5 1.5S11.17 11 12 11zm0 0c-1.33 0-4 .67-4 2v1h8v-1c0-1.33-2.67-2-4-2zm0 4v3"
                />
              </svg>
              <p>{restaurant.location}</p>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18v-4a4 4 0 014-4h4a4 4 0 014 4v4M8 8a4 4 0 118 0m-8 0h8"
                />
              </svg>
              <p>Status: {restaurant.lead_status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="m-8 p-4 bg-white shadow rounded-md w-1/7">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Order Activity</h2>
        <div className="overflow-auto">
          <CalendarHeatmap
            startDate={oneYearAgo}
            endDate={today}
            values={heatmapData}
            classForValue={(value) => {
              if (!value) return "color-empty";
              return `color-scale-${value.count}`;
            }}
            showWeekdayLabels
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="m-6 flex bg-white shadow rounded-md">
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === "Timeline"
              ? "bg-blue-600 text-white"
              : "text-gray-600"
          }`}
          onClick={() => handleTabChange("Timeline")}
        >
          Timeline
        </button>
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === "Orders" ? "bg-blue-600 text-white" : "text-gray-600"
          }`}
          onClick={() => handleTabChange("Orders")}
        >
          Orders
        </button>
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === "POC" ? "bg-blue-600 text-white" : "text-gray-600"
          }`}
          onClick={() => handleTabChange("POC")}
        >
          POC
        </button>
      </div>

      {/* Tab Content */}
      <div className="m-6 p-4 bg-white shadow rounded-md">
        {activeTab === "Timeline" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Timeline</h2>
            <ol className="relative border-l border-gray-200 dark:border-gray-700 mt-6">
              {timelineData.map((interaction, index) => (
                <li key={index} className="mb-10 ml-6">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {new Date(
                      interaction.interaction_date,
                    ).toLocaleDateString()}
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {interaction.interaction_type}
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {interaction.details}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Outcome: {interaction.outcome}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {activeTab === "Orders" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
            <table className="w-full mt-4 text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Order ID</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order) => (
                  <tr key={order.order_id} className="border-b">
                    <td className="py-2">{order.order_id}</td>
                    <td className="py-2">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                    <td className="py-2">₹{order.total_amount}</td>
                    <td className="py-2 text-green-600">
                      {order.order_status}
                    </td>
                    <td className="py-2">
                      <button
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => navigate(`/orders/${order.order_id}`)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "POC" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Point of Contacts
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {pocData.map((poc, index) => (
                <div key={index} className="p-4 bg-gray-50 shadow rounded-md">
                  <h3 className="font-medium text-gray-800">{poc.name}</h3>
                  <p className="text-gray-600">{poc.role}</p>
                  <p className="text-gray-600">{poc.phone}</p>
                  <p className="text-gray-600">{poc.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
