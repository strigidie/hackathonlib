/**
 * AppHeader Component
 * 
 * Application header with branding, navigation, and user controls
 * 
 * Key functionality:
 * - App logo and branding
 * - Notification and settings buttons
 * - User profile avatar
 * - Responsive header layout
 */

'use client';

import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { UserProfile } from '@/types';

interface AppHeaderProps {
  userProfile: UserProfile;
}

const AppHeader: React.FC<AppHeaderProps> = ({ userProfile }) => {
  // Generate user initials from profile data
  const getUserInitials = (profile: UserProfile): string => {
    if (profile.location) {
      return profile.location.split(',')[0].substring(0, 2).toUpperCase();
    }
    return 'JD'; // Default fallback
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Foodiet</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {getUserInitials(userProfile)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
