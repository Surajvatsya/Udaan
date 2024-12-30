
// KPIOverview.js
export const KPIOverview = () => (
    <div className="grid grid-cols-4 gap-4">
      <KpiCard title="Total Orders" value="1,234" trend="12%" trendType="positive" />
      <KpiCard title="Average Order Value" value="₹15,750" trend="8%" trendType="positive" />
      <KpiCard title="Active Accounts" value="180" trend="-3%" trendType="negative" />
      <KpiCard title="Retention Rate" value="92%" trend="2%" trendType="positive" />
    </div>
  );
  
  const KpiCard = ({ title, value, trend, trendType }) => (
    <div className="bg-gray-200 p-4 rounded-lg shadow">
      <div className="text-sm font-semibold text-gray-600">{title}</div>
      <div className="text-2xl font-bold text-blue-900">{value}</div>
      <div className={`text-sm ${trendType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
        {trendType === 'positive' ? '↑' : '↓'} {trend} vs last period
      </div>
    </div>
  );
  