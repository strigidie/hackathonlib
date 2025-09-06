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
import AppSidebar from './AppSidebar';
import DashboardContent from './DashboardContent';

interface WebAppInterfaceProps {
  userProfile: UserProfile;
}

const WebAppInterface: React.FC<WebAppInterfaceProps> = ({ userProfile }) => {
  return (
    <div className="min-h-screen flex">
      <AppSidebar userProfile={userProfile} />
      <DashboardContent userProfile={userProfile} />
    </div>
  );
};

export default WebAppInterface;
