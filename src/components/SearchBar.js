import React from "react";

const SearchBar = () => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search leads..."
        className="w-full max-w-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
};

export default SearchBar;
