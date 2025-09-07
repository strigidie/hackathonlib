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

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bell, Settings } from 'lucide-react';
import { NAV_ITEMS } from '@/config/constants';
import { UserProfile } from '@/types';

interface AppSidebarProps {
  userProfile: UserProfile;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ userProfile }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Handle client-side mounting and set initial state
  useEffect(() => {
    setIsClient(true);
    
    // Set initial collapsed state based on screen size
    const isMobileScreen = window.innerWidth < 1024;
    setIsMobile(isMobileScreen);
    if (isMobileScreen) {
      setIsCollapsed(true);
    }
  }, []);

  // Check screen size changes
  useEffect(() => {
    if (!isClient) return;

    const checkScreenSize = () => {
      const isMobileScreen = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(isMobileScreen);
    };

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isClient]);

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
    <aside className={`
      ${isCollapsed ? 'w-16 lg:w-20' : 'w-64 lg:w-80'} 
      sidebar-modern 
      h-screen 
      sticky top-0 
      transition-all duration-300 ease-in-out 
      flex flex-col
    `}>
      {/* Logo Section */}
      <div className="p-3 lg:p-6 border-b border-white border-opacity-20">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 lg:space-x-4'}`}>
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-gray-800 to-black rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm lg:text-lg">F</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg lg:text-xl font-bold heading-modern">Foodiet</h1>
                <p className="text-xs subheading-modern">Performance Nutrition</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 lg:p-2 hover:bg-white hover:bg-opacity-20 rounded-lg lg:rounded-xl transition-all duration-300"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-3 lg:p-6 space-y-2 lg:space-y-3">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`flex items-center ${
              isCollapsed ? 'justify-center px-2 lg:px-3' : 'space-x-3 lg:space-x-4 px-3 lg:px-4'
            } py-2 lg:py-3 rounded-xl lg:rounded-2xl transition-all duration-300 group ${
              item.active 
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-lg' 
                : 'hover:bg-white hover:bg-opacity-60 text-gray-700 hover:text-gray-900'
            }`}
            title={isCollapsed ? item.name : undefined}
          >
            <div className={`p-1.5 lg:p-2 rounded-lg lg:rounded-xl transition-all duration-300 ${
              item.active 
                ? 'bg-white bg-opacity-20' 
                : 'bg-gray-100 group-hover:bg-white group-hover:bg-opacity-80'
            }`}>
              <item.icon className="w-4 h-4 lg:w-5 lg:h-5" />
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-sm lg:text-base">{item.name}</span>
            )}
          </a>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="p-3 lg:p-6 border-t border-white border-opacity-20">
        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="flex items-center space-x-2 mb-3 lg:mb-4">
            <button className="p-2 lg:p-3 hover:bg-white hover:bg-opacity-50 rounded-xl lg:rounded-2xl transition-all duration-300 backdrop-blur group flex-1">
              <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 group-hover:text-gray-800 transition-colors mx-auto" />
            </button>
            <button className="p-2 lg:p-3 hover:bg-white hover:bg-opacity-50 rounded-xl lg:rounded-2xl transition-all duration-300 backdrop-blur group flex-1">
              <Settings className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 group-hover:text-gray-800 transition-colors mx-auto" />
            </button>
          </div>
        )}

        {/* User Profile */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 lg:space-x-4'} p-2 lg:p-3 rounded-xl lg:rounded-2xl bg-white bg-opacity-20 backdrop-blur`}>
          <div className="relative">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white ring-opacity-30">
              <span className="text-white text-xs lg:text-sm font-semibold">
                {getUserInitials(userProfile)}
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 lg:-bottom-1 lg:-right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 truncate text-sm lg:text-base">{getUserName()}</div>
              <div className="text-xs text-gray-600 truncate">
                {userProfile.target === 'normal' ? 'Foundation' : 
                 userProfile.target === 'sporty' ? 'Performance' : 'IronMan'} Plan
              </div>
            </div>
          )}
        </div>

        {/* Live Tracking Indicator */}
        {!isCollapsed && (
          <div className="mt-3 lg:mt-4 premium-card px-3 lg:px-4 py-2">
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
