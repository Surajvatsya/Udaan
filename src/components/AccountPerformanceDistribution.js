// AccountPerformanceDistribution.js
export const AccountPerformanceDistribution = () => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold text-blue-900 mb-4">Account Performance Distribution</h3>
      <div className="h-48 bg-gray-100 flex items-center justify-center">(Donut Chart Placeholder)</div>
    </div>
  );

  export const TopPerformingAccounts = () => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold text-blue-900 mb-4">Top Performing Accounts</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b py-2">Account Name</th>
            <th className="border-b py-2">Orders</th>
            <th className="border-b py-2">Growth</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">Spice Garden</td>
            <td className="py-2">245</td>
            <td className="py-2 text-green-600">+28%</td>
          </tr>
          <tr>
            <td className="py-2">Food Haven</td>
            <td className="py-2">198</td>
            <td className="py-2 text-green-600">+22%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
// AtRiskAccounts.js
export const AtRiskAccounts = () => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold text-blue-900 mb-4">At-Risk Accounts</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b py-2">Account Name</th>
            <th className="border-b py-2">Last Order</th>
            <th className="border-b py-2">Trend</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">Taste of India</td>
            <td className="py-2">15 days ago</td>
            <td className="py-2 text-red-600">-18%</td>
          </tr>
          <tr>
            <td className="py-2">Green Plate</td>
            <td className="py-2">20 days ago</td>
            <td className="py-2 text-red-600">-25%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  
  // TimePeriodSelector.js
  export const TimePeriodSelector = () => (
    <select className="bg-gray-200 p-2 rounded">
      <option>Last 30 Days</option>
      <option>Last 7 Days</option>
      <option>Last Year</option>
    </select>
  );  

// export {
//     AccountPerformanceDistribution,
//     TopPerformingAccounts,
//     AtRiskAccounts,
//     TimePeriodSelector
//   };