
import React from 'react';

const stats = [
  { id: 1, title: 'Total Leads', value: 120 },
  { id: 2, title: 'Active Leads', value: 85 },
  { id: 3, title: "Today's Calls", value: 12 },
];

const StatsCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
          >
            <h3 className="text-3xl font-bold text-blue-900">{stat.value}</h3>
            <p className="text-gray-600 mt-2">{stat.title}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default StatsCards;