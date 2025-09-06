/**
 * StatsGrid Component
 * 
 * Daily statistics overview grid
 * 
 * Key functionality:
 * - Displays calories, protein, sugar, and activity stats
 * - Shows progress bars with percentages
 * - Color-coded progress indicators
 * - Responsive grid layout
 */

'use client';

import React from 'react';
import { Apple, Zap, TrendingUp, Activity } from 'lucide-react';
import { SAMPLE_DAILY_STATS } from '@/config/constants';

const StatsGrid: React.FC = () => {
  const stats = [
    {
      label: 'Calories',
      icon: Apple,
      iconClass: 'icon-container-calories',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
      data: SAMPLE_DAILY_STATS.calories
    },
    {
      label: 'Protein',
      icon: Zap,
      iconClass: 'icon-container-protein',
      gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
      data: SAMPLE_DAILY_STATS.protein
    },
    {
      label: 'Sugar',
      icon: TrendingUp,
      iconClass: 'icon-container-sugar',
      gradient: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)',
      data: SAMPLE_DAILY_STATS.sugar
    },
    {
      label: 'Activity',
      icon: Activity,
      iconClass: 'icon-container-activity',
      gradient: 'linear-gradient(135deg, #48cae4 0%, #023e8a 100%)',
      data: SAMPLE_DAILY_STATS.activity
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card-modern group">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                {stat.label}
              </h3>
              <div className="text-xs text-gray-500">
                {stat.data.percentage}% of goal
              </div>
            </div>
            <div className={`icon-container-modern ${stat.iconClass}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-baseline space-x-2">
              <div className="text-3xl font-bold text-gray-900">
                {stat.label === 'Activity' ? stat.data.current : 
                 stat.label === 'Protein' ? stat.data.current :
                 stat.label === 'Sugar' ? stat.data.current :
                 stat.data.current}
              </div>
              <div className="text-sm font-medium text-gray-600">
                {stat.label === 'Activity' ? 'min' : 
                 stat.label === 'Protein' ? 'g' :
                 stat.label === 'Sugar' ? 'g' :
                 'kcal'}
              </div>
              <div className="text-xs text-gray-400 ml-auto">
                / {stat.label === 'Activity' ? `${stat.data.target}min` :
                   stat.label === 'Protein' ? `${stat.data.target}g` :
                   stat.label === 'Sugar' ? `${stat.data.target}g` :
                   stat.data.target}
              </div>
            </div>
            
            <div className="progress-modern">
              <div 
                className="progress-fill-modern"
                style={{ 
                  width: `${stat.data.percentage}%`,
                  background: stat.gradient
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
