import React from "react";
import LeadRow from "./LeadRow";

const LeadList = ({ leads, onAddLead }) => {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Restaurant Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Lead Status
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Last Contact
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadList;
