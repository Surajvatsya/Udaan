import React from 'react';
import  Sidebar  from '../Sidebar';
import { KPIOverview } from '../KPIOverview';
import { OrderTrendsChart } from '../OrderTrendsChart';
import { AccountPerformanceDistribution, TopPerformingAccounts, AtRiskAccounts, TimePeriodSelector } from '../AccountPerformanceDistribution';
// import { TopPerformingAccounts } from './components/TopPerformingAccounts';
// import { AtRiskAccounts } from './components/AtRiskAccounts';
// import { TimePeriodSelector } from './components/TimePeriodSelector';

const PerformanceTrackingPage = () => {
  return (
    <div className="flex h-screen">

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Performance Tracking</h1>
          <TimePeriodSelector />
        </div>

        {/* KPI Overview */}
        <KPIOverview />

        {/* Charts and Tables */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Order Trends */}
          <OrderTrendsChart />

          {/* Account Performance Distribution */}
          <AccountPerformanceDistribution />
        </div>

        {/* Account Tables */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Top Performing Accounts */}
          <TopPerformingAccounts />

          {/* At-Risk Accounts */}
          <AtRiskAccounts />
        </div>
      </div>
    </div>
  );
};

export default PerformanceTrackingPage;