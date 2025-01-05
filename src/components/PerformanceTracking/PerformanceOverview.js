import React, { useEffect, useState } from "react";
import { KPIOverview } from "../KPIOverview";
import { OrderTrendsChart } from "../OrderTrendsChart";
import {
  AccountPerformanceDistribution,
  TopPerformingAccounts,
  AtRiskAccounts,
  TimePeriodSelector,
} from "../../components/PerformanceTracking/AccountPerformanceDistribution";

const PerformanceTrackingPage = () => {
  const [orderStats, setOrderStats] = useState({
    current_period: { total_orders: 0, average_order_value: "0.00" },
    changes: {
      total_order_percentage_change: "0.00",
      average_order_value_percentage_change: "0.00",
    },
  });
  const [accountStats, setAccountStats] = useState({
    current_period: { active_accounts: 0, retention_rate: "0.00" },
    changes: {
      active_account_percentage_change: "0.00",
      retention_rate_percentage_change: "0.00",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timePeriod, setTimePeriod] = useState(7);
  const [topAccounts, setTopAccounts] = useState([]);
  const [atRiskAccounts, setAtRiskAccounts] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const orderResponse = await fetch(
          `http://13.127.185.23:3000/api/order/stats?days=${timePeriod}`,
          {
            headers: {
              token,
              "Content-Type": "application/json",
            },
          },
        );
        if (!orderResponse.ok) throw new Error("Failed to fetch order stats");
        const orderData = await orderResponse.json();

        const accountResponse = await fetch(
          `http://13.127.185.23:3000/api/leads/data?days=${timePeriod}`,
          {
            headers: {
              token,
              "Content-Type": "application/json",
            },
          },
        );
        if (!accountResponse.ok)
          throw new Error("Failed to fetch account stats");
        const accountData = await accountResponse.json();

        setOrderStats(orderData);
        setAccountStats(accountData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, [timePeriod]);

  useEffect(() => {
    const fetchAccountStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://13.127.185.23:3000/api/leads/perf?days=${timePeriod}`,
          {
            headers: {
              token,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch account performance stats");
        }
        const data = await response.json();
        setTopAccounts(data.topPerformingAccounts);
        setAtRiskAccounts(data.atRiskAccounts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAccountStats();
  }, [timePeriod]);

  const handleTimePeriodChange = (newPeriod) => {
    setTimePeriod(newPeriod);
  };

  useEffect(() => {
    const fetchOrderTrends = async () => {
      try {
        const response = await fetch(
          `http://13.127.185.23:3000/api/order/trends?days=${timePeriod}`,
          {
            headers: {
              token,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch order trends");
        }
        const data = await response.json();
        setOrderData(data);
      } catch (err) {
        console.error("Error fetching order trends:", err);
        setError(err.message);
      }
    };

    fetchOrderTrends();
  }, [timePeriod]);

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">
            Performance Tracking
          </h1>
          <TimePeriodSelector onChange={handleTimePeriodChange} />
        </div>

        {/* KPI Overview */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <KPIOverview
            totalOrders={orderStats.current_period.total_orders}
            averageOrderValue={orderStats.current_period.average_order_value}
            totalOrderTrend={orderStats.changes.total_order_percentage_change}
            aovTrend={orderStats.changes.average_order_value_percentage_change}
            activeAccounts={accountStats.current_period.active_accounts}
            activeAccountsTrend={
              accountStats.changes.active_account_percentage_change
            }
            retentionRate={accountStats.current_period.retention_rate}
            retentionRateTrend={
              accountStats.changes.retention_rate_percentage_change
            }
          />
        )}

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="col-span-1  p-4 shadow rounded-lg">
            <OrderTrendsChart orderData={orderData} />
          </div>

          {/* Revenue Contribution */}
          <div className="col-span-1  p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Revenue Contribution
            </h2>
            <AccountPerformanceDistribution timePeriod={timePeriod} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <>
              <TopPerformingAccounts accounts={topAccounts || []} />
              <AtRiskAccounts accounts={atRiskAccounts} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceTrackingPage;
