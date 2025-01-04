// KPIOverview.js
export const KPIOverview = ({
  totalOrders,
  averageOrderValue,
  totalOrderTrend,
  aovTrend,
  activeAccounts,
  activeAccountsTrend,
  retentionRate,
  retentionRateTrend,
}) => (
  <div className="grid grid-cols-4 gap-4">
    <KpiCard
      title="Total Orders"
      value={totalOrders}
      trend={`${totalOrderTrend}%`}
      trendType={parseFloat(totalOrderTrend) > 0 ? "positive" : "negative"}
    />
    <KpiCard
      title="Average Order Value"
      value={`₹${averageOrderValue}`}
      trend={`${aovTrend}%`}
      trendType={parseFloat(aovTrend) > 0 ? "positive" : "negative"}
    />
    <KpiCard
      title="Active Accounts"
      value={activeAccounts}
      trend={`${activeAccountsTrend}%`}
      trendType={parseFloat(activeAccountsTrend) > 0 ? "positive" : "negative"}
    />
    <KpiCard
      title="Retention Rate"
      value={`${retentionRate}%`}
      trend={`${retentionRateTrend}%`}
      trendType={parseFloat(retentionRateTrend) > 0 ? "positive" : "negative"}
    />
  </div>
);

const KpiCard = ({ title, value, trend, trendType }) => (
  <div className="bg-gray-200 p-4 rounded-lg shadow">
    <div className="text-sm font-semibold text-gray-600">{title}</div>
    <div className="text-2xl font-bold text-blue-900">{value}</div>
    <div
      className={`text-sm ${trendType === "positive" ? "text-green-600" : "text-red-600"}`}
    >
      {trendType === "positive" ? "↑" : "↓"} {trend} vs last period
    </div>
  </div>
);
