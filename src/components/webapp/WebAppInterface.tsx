/**
 * WebAppInterface Component
 * 
 * Main application interface after onboarding
 * Provides the complete dashboard and functionality
 * 
 * Key functionality:
 * - Header with navigation and user profile
 * - Sidebar navigation menu
 * - Main content area with dashboard
 * - Stats overview and quick actions
 * - Food log and smart swaps
 */

'use client';

import React from 'react';
import { UserProfile } from '@/types';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import DashboardContent from './DashboardContent';

interface WebAppInterfaceProps {
  userProfile: UserProfile;
}

const WebAppInterface: React.FC<WebAppInterfaceProps> = ({ userProfile }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader userProfile={userProfile} />
      
      <div className="flex">
        <AppSidebar />
        <DashboardContent userProfile={userProfile} />
      </div>
    </div>
  );
};

export default WebAppInterface;
