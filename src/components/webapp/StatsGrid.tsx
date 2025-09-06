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
      color: 'text-red-500',
      gradient: 'from-red-400 to-red-600',
      data: SAMPLE_DAILY_STATS.calories
    },
    {
      label: 'Protein',
      icon: Zap,
      color: 'text-blue-500',
      gradient: 'from-blue-400 to-blue-600',
      data: SAMPLE_DAILY_STATS.protein
    },
    {
      label: 'Sugar',
      icon: TrendingUp,
      color: 'text-yellow-500',
      gradient: 'from-yellow-400 to-yellow-600',
      data: SAMPLE_DAILY_STATS.sugar
    },
    {
      label: 'Activity',
      icon: Activity,
      color: 'text-green-500',
      gradient: 'from-green-400 to-green-600',
      data: SAMPLE_DAILY_STATS.activity
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="stat-label">{stat.label}</h3>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <div className="space-y-2">
            <div className="stat-value">
              {stat.label === 'Activity' ? `${stat.data.current}min` : 
               stat.label === 'Protein' ? `${stat.data.current}g` :
               stat.label === 'Sugar' ? `${stat.data.current}g` :
               stat.data.current}
            </div>
            <div className="text-sm text-gray-500">
              of {stat.label === 'Activity' ? `${stat.data.target}min goal` :
                  stat.label === 'Protein' ? `${stat.data.target}g goal` :
                  stat.label === 'Sugar' ? `${stat.data.target}g limit` :
                  `${stat.data.target} goal`}
            </div>
            <div className="stat-progress">
              <div 
                className={`stat-progress-fill bg-gradient-to-r ${stat.gradient}`}
                style={{ width: `${stat.data.percentage}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
