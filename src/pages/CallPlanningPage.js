import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const CallManagementPage = () => {
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (fromDate)
          params.append("fromDate", fromDate.toISOString().split("T")[0]);
        if (toDate) params.append("toDate", toDate.toISOString().split("T")[0]);

        const response = await fetch(
          `http://13.127.185.23:4000/api/interactions?${params.toString()}`,
          {
            headers: {
              token,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) throw new Error("Failed to fetch call data");
        const data = await response.json();

        // Combine and format calls
        const allCalls = [
          ...data.overdueCalls.map((call) => ({ ...call, status: "overdue" })),
          ...data.todaysCalls.map((call) => ({ ...call, status: "today" })),
          ...data.upcomingCalls.map((call) => ({
            ...call,
            status: "upcoming",
          })),
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
        call.restaurant_name.toLowerCase().includes(query),
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
  const navigate = useNavigate();

  // Status styles
  const statusColors = {
    overdue: "bg-red-100 text-red-500",
    today: "bg-gray-900 text-white",
    upcoming: "bg-blue-100 text-blue-500",
  };

  // Handle Call Button Click
  const handleCallClick = (call) => {
    navigate("/interaction", { state: { call } });
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      {/* Section Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search calls..."
        value={searchQuery}
        onChange={onSearch}
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
      />

      {/* Calls List */}
      <div className="space-y-4">
        {statusCalls.length > 0 ? (
          statusCalls.map((call, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between">
                {/* Left Section */}
                <div className="mb-2 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-800">
                    {call.restaurant_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    POC: {call.poc_name} | Contact: {call.poc_contact}
                  </p>
                  <p className="text-sm text-gray-600">
                    Follow-up:{" "}
                    {new Date(call.follow_up_date).toLocaleDateString()}
                  </p>
                </div>

                {/* Right Section */}
                <div className="flex flex-col md:items-end space-y-2">
                  <span
                    className={`px-4 py-1 text-sm rounded-full font-medium ${statusColors[status]}`}
                  >
                    {status}
                  </span>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    onClick={() => handleCallClick(call)}
                  >
                    Call
                  </button>
                </div>
              </div>

              {/* Details Section */}
              {call.last_call_details && (
                <div className="mt-2 p-2 bg-gray-100 rounded-md">
                  <p className="text-sm text-gray-700">
                    <strong>Details:</strong> {call.last_call_details}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Outcome:</strong>{" "}
                    {call.last_call_outcome || "No outcome recorded"}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">
            No calls available for this status.
          </p>
        )}
      </div>
    </div>
  );
};

export default CallManagementPage;
