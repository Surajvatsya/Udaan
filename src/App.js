import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LeadManagementPage from "./pages/LeadManagementPage";
import ContactManagementPage from "./pages/ContactManagementPage";
import RestaurantDetailsPage from "./pages/RestaurantDetails";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import { SignUpPage, SignInPage } from "./pages/Auth";
import InteractionTrackingPage from "./pages/InteractionTrackingPage";
import CallPlanningPage from "./pages/CallPlanningPage";
import PerformanceTrackingPage from "./pages/PerformanceTrackingPage";
import AddLead from "./components/LeadManagement/AddLead";
import Interaction from "./components/InteractionTracking/AddInteraction";
import Order from "./components/Order";
import Performance from "./components/PerformanceTracking/PerformanceOverview";

function App() {
  const token = localStorage.getItem("jwtToken");

  return (
    <div className="flex h-screen">
      {token && <Sidebar />}
      <div className="flex-1">
        <Routes>
          {!token ? (
            <>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/*" element={<Navigate to="/signin" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leads" element={<LeadManagementPage />} />
              <Route path="/addLead" element={<AddLead />} />
              <Route path="/contacts" element={<ContactManagementPage />} />
              <Route path="/interaction" element={<Interaction />} />
              <Route path="/order" element={<Order />} />
              <Route path="/calls" element={<CallPlanningPage />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/orders/:order_id" element={<OrderDetailsPage />} />
              <Route
                path="/restaurantsDetails/:id"
                element={<RestaurantDetailsPage />}
              />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
