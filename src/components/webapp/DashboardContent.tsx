/**
 * DashboardContent Component
 * 
 * Main dashboard content area
 * 
 * Key functionality:
 * - Welcome message and greeting
 * - Daily stats overview
 * - Quick action buttons
 * - Recent food entries
 * - Smart swap suggestions
 */

'use client';

import React from 'react';
import { UserProfile } from '@/types';
import StatsGrid from './StatsGrid';
import QuickActions from './QuickActions';
import FoodLog from './FoodLog';
import SmartSwaps from './SmartSwaps';

interface DashboardContentProps {
  userProfile: UserProfile;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ userProfile }) => {
  // Generate greeting based on time of day
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Get user name from location or use default
  const getUserName = (): string => {
    if (userProfile.location) {
      return userProfile.location.split(',')[0];
    }
    return 'John';
  };

  return (
    <main className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {getGreeting()}, {getUserName()}
          </h2>
          <p className="text-gray-600">Ready to fuel your pursuit today?</p>
        </div>

        {/* Stats Grid */}
        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>

          {/* Recent Foods */}
          <div className="lg:col-span-2">
            <FoodLog />
          </div>
        </div>

        {/* Smart Swaps */}
        <SmartSwaps />
      </div>
    </main>
  );
};

export default DashboardContent;
