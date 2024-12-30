import React, { useEffect, useState } from 'react';

const StatsCards = () => {
  const [stats, setStats] = useState([
    { id: 1, title: 'Total Leads', value: 0 },
    { id: 2, title: 'Active Leads', value: 0 },
    { id: 3, title: "Today's Calls", value: 0 },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch Total Leads and Active Leads
        const leadsResponse = await fetch('http://localhost:3000/api/leads/stats');
        if (!leadsResponse.ok) throw new Error('Failed to fetch leads stats');
        const leadsData = await leadsResponse.json();

        // Fetch Today's Calls
        const callsResponse = await fetch('http://localhost:3000/api/interactions/today');
        if (!callsResponse.ok) throw new Error("Failed to fetch today's calls stats");
        const callsData = await callsResponse.json();

        // Update stats with fetched values
        setStats([
          { id: 1, title: 'Total Leads', value: leadsData.totalLeads || 0 },
          { id: 2, title: 'Active Leads', value: leadsData.activeLeads || 0 },
          { id: 3, title: "Today's Calls", value: callsData.todaysCallsCount || 0 },
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

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
