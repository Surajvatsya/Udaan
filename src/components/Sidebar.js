import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Menu</h2>
      </div>
      <ul>
        <li
          className={`mb-4 p-2 rounded cursor-pointer hover:bg-[#D8A71D] ${
            location.pathname === "/" ? "bg-[#D8A71D]" : "bg-blue-800"
          }`}
          onClick={() => handleNavigation("/")}
        >
          Dashboard
        </li>
        <li
          className={`mb-4 p-2 rounded cursor-pointer hover:bg-[#D8A71D] ${
            location.pathname === "/leads" ? "bg-[#D8A71D]" : "bg-blue-800"
          }`}
          onClick={() => handleNavigation("/leads")}
        >
          Lead Management
        </li>
        <li
          className={`mb-4 p-2 rounded cursor-pointer hover:bg-[#D8A71D] ${
            location.pathname === "/contacts" ? "bg-[#D8A71D]" : "bg-blue-800"
          }`}
          onClick={() => handleNavigation("/contacts")}
        >
          Contact Management
        </li>
        <li
          className={`mb-4 p-2 rounded cursor-pointer hover:bg-[#D8A71D] ${
            location.pathname === "/interaction" ? "bg-[#D8A71D]" : "bg-blue-800"
          }`}
          onClick={() => handleNavigation("/interaction")}
        >
          Interactions
        </li>
        <li
          className={`mb-4 p-2 rounded cursor-pointer hover:bg-[#D8A71D] ${
            location.pathname === "/order" ? "bg-[#D8A71D]" : "bg-blue-800"
          }`}
          onClick={() => handleNavigation("/order")}
        >
          Order
        </li>
        <li
          className={`mb-4 p-2 rounded cursor-pointer hover:bg-[#D8A71D] ${
            location.pathname === "/performance" ? "bg-[#D8A71D]" : "bg-blue-800"
          }`}
          onClick={() => handleNavigation("/performance")}
        >
          Performance
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
