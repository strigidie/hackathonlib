/**
 * AppSidebar Component
 * 
 * Collapsible sidebar with logo, navigation, and profile
 * 
 * Key functionality:
 * - Collapsible sidebar with toggle
 * - Company logo at top
 * - Navigation menu items
 * - User profile section at bottom
 * - Active state management
 */

'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bell, Settings } from 'lucide-react';
import { NAV_ITEMS } from '@/config/constants';
import { UserProfile } from '@/types';

interface AppSidebarProps {
  userProfile: UserProfile;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ userProfile }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Generate user initials from profile data
  const getUserInitials = (profile: UserProfile): string => {
    if (profile.location) {
      return profile.location.split(',')[0].substring(0, 2).toUpperCase();
    }
    return 'JD'; // Default fallback
  };

  const getUserName = (): string => {
    if (userProfile.location) {
      return userProfile.location.split(',')[0];
    }
    return 'John';
  };

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-80'} sidebar-modern h-screen sticky top-0 transition-all duration-300 ease-in-out flex flex-col`}>
      {/* Logo Section */}
      <div className="p-6 border-b border-white border-opacity-20">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-4 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold heading-modern">Foodiet</h1>
                <p className="text-xs subheading-modern">Performance Nutrition</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-300"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-6 space-y-3">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`flex items-center ${isCollapsed ? 'justify-center px-3' : 'space-x-4 px-4'} py-3 rounded-2xl transition-all duration-300 group ${
              item.active 
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-lg' 
                : 'hover:bg-white hover:bg-opacity-60 text-gray-700 hover:text-gray-900'
            }`}
            title={isCollapsed ? item.name : undefined}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              item.active 
                ? 'bg-white bg-opacity-20' 
                : 'bg-gray-100 group-hover:bg-white group-hover:bg-opacity-80'
            }`}>
              <item.icon className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <span className="font-semibold">{item.name}</span>
            )}
          </a>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="p-6 border-t border-white border-opacity-20">
        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="flex items-center space-x-2 mb-4">
            <button className="p-3 hover:bg-white hover:bg-opacity-50 rounded-2xl transition-all duration-300 backdrop-blur group flex-1">
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors mx-auto" />
            </button>
            <button className="p-3 hover:bg-white hover:bg-opacity-50 rounded-2xl transition-all duration-300 backdrop-blur group flex-1">
              <Settings className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors mx-auto" />
            </button>
          </div>
        )}

        {/* User Profile */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'} p-3 rounded-2xl bg-white bg-opacity-20 backdrop-blur`}>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white ring-opacity-30">
              <span className="text-white text-sm font-semibold">
                {getUserInitials(userProfile)}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 truncate">{getUserName()}</div>
              <div className="text-xs text-gray-600 truncate">
                {userProfile.target === 'normal' ? 'Foundation' : 
                 userProfile.target === 'sporty' ? 'Performance' : 'IronMan'} Plan
              </div>
            </div>
          )}
        </div>

        {/* Live Tracking Indicator */}
        {!isCollapsed && (
          <div className="mt-4 premium-card px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-gray-700">Live Tracking Active</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;
