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
    <aside className="w-64 bg-white border-r border-gray-200 h-screen">
      <nav className="p-6 space-y-2">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
