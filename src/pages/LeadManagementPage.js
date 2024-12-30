import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeadList from '../components/LeadManagement/LeadList';
import Summary from '../components/LeadManagement/Summary';

const LeadManagementPage = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]); // Filtered leads for search
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/leads/');
        if (!response.ok) {
          throw new Error('Failed to fetch leads');
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

  const handleAddLead = (newLead) => {
    setLeads([...leads, newLead]);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter leads based on the search query
    const results = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(query) ||
        lead.status.toLowerCase().includes(query)
    );
    setFilteredLeads(results);
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Lead Management</h1>
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-1/2 p-2 border rounded"
          />
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => navigate('/addLead')}
          >
            + Add Lead
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <LeadList leads={filteredLeads} onAddLead={handleAddLead} />
            <div className="mt-10">
              <Summary leads={filteredLeads} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadManagementPage;
