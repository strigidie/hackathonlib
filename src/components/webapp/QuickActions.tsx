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
      color: 'text-emerald-600',
      onClick: () => {
        // TODO: Implement photo capture
        console.log('Photo capture clicked');
        alert('Photo capture feature coming soon!');
      }
    },
    {
      icon: Mic,
      title: 'Voice',
      description: 'Tell us what you ate',
      color: 'text-blue-600',
      onClick: () => {
        // TODO: Implement voice input
        console.log('Voice input clicked');
        alert('Voice input feature coming soon!');
      }
    },
    {
      icon: Type,
      title: 'Text',
      description: 'Quick manual entry',
      color: 'text-purple-600',
      onClick: () => {
        // TODO: Implement text input
        console.log('Text input clicked');
        alert('Text input feature coming soon!');
      }
    }
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h3 className="text-lg lg:text-2xl font-bold heading-modern mb-2">Quick Capture</h3>
        <p className="text-sm lg:text-base subheading-modern">Log your nutrition instantly</p>
      </div>
      
      <div className="space-y-3 lg:space-y-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="action-button-modern w-full flex items-center space-x-3 lg:space-x-4 group p-3 lg:p-4"
          >
            <div className={`p-2 lg:p-3 rounded-2xl transition-all duration-300 ${
              action.color === 'text-emerald-600' ? 'bg-emerald-100 group-hover:bg-emerald-200' :
              action.color === 'text-blue-600' ? 'bg-blue-100 group-hover:bg-blue-200' :
              'bg-purple-100 group-hover:bg-purple-200'
            }`}>
              <action.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${action.color} transition-transform group-hover:scale-110`} />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-gray-900 text-base lg:text-lg">{action.title}</div>
              <div className="text-xs lg:text-sm text-gray-600">{action.description}</div>
            </div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        ))}
      </div>

      <div className="premium-card p-3 lg:p-4 mt-4 lg:mt-6">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-xs lg:text-sm">Smart Recognition</div>
            <div className="text-xs text-gray-600">Powered by advanced AI</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default QuickActions;
