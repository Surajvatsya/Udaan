import React from "react";
import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LeadManagementPage from "./pages/LeadManagementPage";
import ContactManagementPage from "./pages/ContactManagementPage";
import RestaurantDetailsPage from "./pages/RestaurantDetails";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import {SignUpPage,SignInPage} from "./pages/Auth";
import InteractionTrackingPage from "./pages/InteractionTrackingPage";
import CallPlanningPage from "./pages/CallPlanningPage";
import PerformanceTrackingPage from "./pages/PerformanceTrackingPage";
import AddLead from "./components/LeadManagement/AddLead";
import Interaction from "./components/InteractionTracking/AddInteraction";
import Order from "./components/Order";
import Performance from "./components/PerformanceTracking/PerformanceOverview";


function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<LeadManagementPage />} />
          <Route path="/addLead" element={<AddLead />} />
          <Route path="/contacts" element={<ContactManagementPage />} />
          <Route path="/interaction" element={<Interaction />} />
          <Route path="/order" element={<Order />} />
          <Route path="/calls" element={<CallPlanningPage />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/orders/:order_id" element={<OrderDetailsPage />} />
          <Route path="/restaurantsDetails/:id" element={<RestaurantDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;