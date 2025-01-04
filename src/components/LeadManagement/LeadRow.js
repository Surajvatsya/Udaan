import React from "react";
import { useNavigate } from "react-router-dom";

const LeadRow = ({ lead }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/restaurantsDetails/${lead.id}`);
  };

  return (
    <tr onClick={handleRowClick} className="cursor-pointer hover:bg-gray-100">
      <td className="border px-4 py-2">{lead.name}</td>
      <td className="border px-4 py-2">
        <span
          className={
            lead.status === "Active"
              ? "bg-green-200 text-green-700 px-2 py-1 rounded"
              : "bg-yellow-200 text-yellow-700 px-2 py-1 rounded"
          }
        >
          {lead.status}
        </span>
      </td>
      <td className="border px-4 py-2">{lead.lastContact}</td>
      <td className="border px-4 py-2">
        <button className="text-blue-500 hover:underline">Edit</button>
      </td>
    </tr>
  );
};

export default LeadRow;
