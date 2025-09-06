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
    <header className="header-modern px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold heading-modern">Foodiet</h1>
            <p className="text-xs subheading-modern">Performance Nutrition</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-3 hover:bg-white hover:bg-opacity-50 rounded-2xl transition-all duration-300 backdrop-blur group">
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>
          <button className="p-3 hover:bg-white hover:bg-opacity-50 rounded-2xl transition-all duration-300 backdrop-blur group">
            <Settings className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white ring-opacity-30">
              <span className="text-white text-sm font-semibold">
                {getUserInitials(userProfile)}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
