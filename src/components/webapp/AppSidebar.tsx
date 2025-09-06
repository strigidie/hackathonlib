/**
 * AppSidebar Component
 * 
 * Application sidebar navigation
 * 
 * Key functionality:
 * - Navigation menu items
 * - Active state management
 * - Responsive sidebar layout
 * - Icon and text navigation
 */

'use client';

import React from 'react';
import { NAV_ITEMS } from '@/config/constants';

const AppSidebar: React.FC = () => {
  return (
    <aside className="w-72 sidebar-modern h-screen sticky top-0">
      <nav className="p-6 space-y-3 pt-8">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${
              item.active 
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-lg' 
                : 'hover:bg-white hover:bg-opacity-60 text-gray-700 hover:text-gray-900'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              item.active 
                ? 'bg-white bg-opacity-20' 
                : 'bg-gray-100 group-hover:bg-white group-hover:bg-opacity-80'
            }`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="font-semibold">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
