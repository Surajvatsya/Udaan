// components/LeadTable.js
import React, { useState } from "react";

const sampleLeads = [
  { id: 1, name: "John Doe", status: "Active", callsToday: 3 },
  { id: 2, name: "Jane Smith", status: "New", callsToday: 0 },
  { id: 3, name: "Michael Johnson", status: "Active", callsToday: 2 },
];

const LeadTable = () => {
  const [leads, setLeads] = useState(sampleLeads);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Calls Today</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-100 transition">
              <td className="p-3 border-b">{lead.name}</td>
              <td className="p-3 border-b">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
                    lead.status === "Active" ? "bg-green-600" : "bg-yellow-500"
                  }`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="p-3 border-b">{lead.callsToday}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
