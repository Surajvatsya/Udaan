import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeadList from "../components/LeadManagement/LeadList";
import Summary from "../components/LeadManagement/Summary";

const LeadManagementPage = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]); // Filtered leads for search and status
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filterStatus, setFilterStatus] = useState("All"); // Filter by status state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:3000/api/leads/", {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch leads");
        }
        const data = await response.json();
        const formattedLeads = data.map((lead) => ({
          id: lead.restaurant_id,
          name: lead.name,
          status: lead.lead_status,
          lastContact: lead.updated_at,
        }));
        setLeads(formattedLeads);
        setFilteredLeads(formattedLeads);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterLeads(query, filterStatus);
  };

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    filterLeads(searchQuery, status);
  };

  const filterLeads = (query, status) => {
    let results = leads;

    if (query) {
      results = results.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query) ||
          lead.status.toLowerCase().includes(query),
      );
    }

    if (status !== "All") {
      results = results.filter((lead) => lead.status === status);
    }

    setFilteredLeads(results);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">
          Lead Management
        </h1>
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-1/2 p-2 border rounded"
          />
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="p-2 border rounded text-gray-700"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="New">New</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <LeadList leads={filteredLeads} />
            <div className="mt-10">
              <Summary leads={filteredLeads} />
            </div>
          </>
        )}
        <button
          className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
          onClick={() => navigate("/addLead")}
        >
          + Add Lead
        </button>
      </div>
    </div>
  );
};

export default LeadManagementPage;
