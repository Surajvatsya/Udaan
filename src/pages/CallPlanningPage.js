import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CallManagementPage = () => {
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (fromDate) params.append('fromDate', fromDate.toISOString().split('T')[0]);
        if (toDate) params.append('toDate', toDate.toISOString().split('T')[0]);

        const response = await fetch(`http://localhost:3000/api/interactions?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch call data');
        const data = await response.json();

        // Combine and format calls
        const allCalls = [
          ...data.overdueCalls.map((call) => ({ ...call, status: 'overdue' })),
          ...data.todaysCalls.map((call) => ({ ...call, status: 'today' })),
          ...data.upcomingCalls.map((call) => ({ ...call, status: 'upcoming' })),
        ];
        setCalls(allCalls);
        setFilteredCalls(allCalls);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCalls();
  }, [fromDate, toDate]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = calls.filter(
      (call) =>
        call.poc_name.toLowerCase().includes(query) ||
        call.restaurant_name.toLowerCase().includes(query)
    );
    setFilteredCalls(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Call Management</h1>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <span className="mr-2 text-gray-700">From:</span>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              className="border border-gray-300 rounded px-2 py-1"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select From Date"
            />
          </label>
          <label className="flex items-center">
            <span className="mr-2 text-gray-700">To:</span>
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              className="border border-gray-300 rounded px-2 py-1"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select To Date"
            />
          </label>
        </div>
      </div>

      {/* Call Sections */}
      <div className="grid grid-cols-3 gap-6">
        <CallSection
          title="Overdue Calls"
          status="overdue"
          calls={filteredCalls}
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />
        <CallSection
          title="Today's Calls"
          status="today"
          calls={filteredCalls}
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />
        <CallSection
          title="Upcoming Calls"
          status="upcoming"
          calls={filteredCalls}
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

const CallSection = ({ title, status, calls, searchQuery, onSearch }) => {
  // Filter calls based on status
  const statusCalls = calls.filter((call) => call.status === status);

  // Status styles
  const statusColors = {
    overdue: 'bg-red-100 text-red-500',
    today: 'bg-gray-900 text-white',
    upcoming: 'bg-blue-100 text-blue-500',
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <input
        type="text"
        placeholder="Search calls..."
        value={searchQuery}
        onChange={onSearch}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="space-y-4">
        {statusCalls.map((call) => (
          <div
            key={call.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50"
          >
            <div>
              <h3 className="text-gray-900 font-medium">{call.poc_name}</h3>
              <p className="text-sm text-gray-500">
                {call.follow_up_date.split('T')[0]} at {call.last_call_details}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[status]}`}
              >
                {status}
              </span>
              <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-300">
                Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallManagementPage;