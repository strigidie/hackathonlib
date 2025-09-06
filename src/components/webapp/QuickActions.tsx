/**
 * QuickActions Component
 * 
 * Quick action buttons for food and activity logging
 * 
 * Key functionality:
 * - Photo capture button
 * - Voice input button
 * - Text input button
 * - Hover effects and transitions
 */

'use client';

import React from 'react';
import { Camera, Mic, Type } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: Camera,
      title: 'Photo',
      description: 'Snap food or labels',
      color: 'text-emerald-600'
    },
    {
      icon: Mic,
      title: 'Voice',
      description: 'Tell us what you ate',
      color: 'text-blue-600'
    },
    {
      icon: Type,
      title: 'Text',
      description: 'Quick manual entry',
      color: 'text-purple-600'
    }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Capture</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="quick-action"
          >
            <action.icon className={`w-6 h-6 ${action.color}`} />
            <div className="text-left">
              <div className="font-semibold text-gray-900">{action.title}</div>
              <div className="text-sm text-gray-600">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
