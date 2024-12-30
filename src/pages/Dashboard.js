import React from 'react';
import {useNavigate} from 'react-router-dom';

// Header Component
const Header = () => {
  return (
    <header className="bg-gradient-to-br from-blue-900 to-blue-500 p-10 text-white relative overflow-hidden">
      <div className="absolute inset-0 w-full h-40 bg-opacity-30 bg-white transform rotate-3"></div>
      <div className="relative">
        <h1 className="text-4xl font-bold">Welcome to Udaan</h1>
        <p className="mt-2 text-lg">Effortlessly manage leads, interactions, and account performance</p>
      </div>
    </header>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description, gradient, onClick }) => {
  return (
    <div
      className={`p-6 bg-gradient-to-br ${gradient} text-white shadow-lg rounded-lg transform hover:scale-105 transition`}
      onClick={onClick}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm">{description}</p>
      <p className="mt-4 text-blue-200 underline cursor-pointer">Learn More →</p>
    </div>
  );
};

// Features Section
const Features = () => {
  const navigate = useNavigate();
  return (
    <section className="py-10 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <FeatureCard
        title="Lead Management"
        description="Add and manage leads"
        gradient="from-blue-700 to-blue-500"
        onClick={() => navigate('/leads')}
      />
      <FeatureCard
        title="Contact Management"
        description="Track POCs and roles"
        gradient="from-green-700 to-green-500"
        onClick={() => navigate('/contacts')}
      />
      <FeatureCard
        title="Call Planning"
        description="Plan and track calls"
        gradient="from-purple-700 to-purple-500"
        onClick={() => navigate('/leads')}
      />
    </section>
  );
};

// Account Performance Section
const AccountPerformance = () => {
  return (
    <section className="py-10 px-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-blue-900">Account Performance</h2>
      <div className="mt-6 h-40 bg-gray-100 flex justify-center items-center">
        {/* Example animated chart */}
        <p className="text-gray-500">Chart Placeholder</p>
      </div>
    </section>
  );
};

// Upcoming Calls Section
const UpcomingCalls = () => {
  return (
    <section className="py-10 px-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-blue-900">Upcoming Calls</h2>
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-gray-50 shadow rounded-lg flex justify-between items-center">
          <p className="text-gray-800">Spice Garden</p>
          <p className="text-gray-500">3:00 PM</p>
        </div>
        <div className="p-4 bg-gray-50 shadow rounded-lg flex justify-between items-center">
          <p className="text-gray-800">Food Haven</p>
          <p className="text-gray-500">4:30 PM</p>
        </div>
      </div>
    </section>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div>
      <Header />
      <Features />
      <div className="py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <AccountPerformance />
        <UpcomingCalls />
      </div>
    </div>
  );
};

export default LandingPage;
