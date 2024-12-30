import React from 'react';

const Summary = ({ leads }) => {
  const totalLeads = leads.length;
  const activeLeads = leads.filter((lead) => lead.status === 'Active').length;
  const todaysCalls = 12; // Mocked data

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="p-6 bg-blue-100 text-center rounded shadow-md">
        <h2 className="text-lg font-semibold text-blue-800">Total Leads</h2>
        <p className="text-3xl font-bold text-blue-800">{totalLeads}</p>
      </div>
      <div className="p-6 bg-green-100 text-center rounded shadow-md">
        <h2 className="text-lg font-semibold text-green-800">Active Leads</h2>
        <p className="text-3xl font-bold text-green-800">{activeLeads}</p>
      </div>
      <div className="p-6 bg-yellow-100 text-center rounded shadow-md">
        <h2 className="text-lg font-semibold text-yellow-800">Today's Calls</h2>
        <p className="text-3xl font-bold text-yellow-800">{todaysCalls}</p>
      </div>
    </div>
  );
};

export default Summary;