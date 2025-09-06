/**
 * FoodLog Component
 * 
 * Today's food log entries
 * 
 * Key functionality:
 * - Displays recent food entries
 * - Shows calories and timing
 * - Category-based organization
 * - View all link
 */

'use client';

import React from 'react';
import { Utensils } from 'lucide-react';
import { SAMPLE_FOOD_ENTRIES } from '@/config/constants';

const FoodLog: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold heading-modern mb-1">Today's Log</h3>
          <p className="subheading-modern">Your nutrition journey today</p>
        </div>
        <button className="premium-card px-4 py-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
          View All
        </button>
      </div>
      
      <div className="premium-card p-6">
        <div className="space-y-3">
          {SAMPLE_FOOD_ENTRIES.map((food, index) => (
            <div key={index} className="food-entry-modern group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-md">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{food.name}</div>
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                      <span>{food.time}</span>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span className="capitalize">{food.category}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">{food.calories}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">calories</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total logged today</span>
            <span className="font-bold text-gray-900">
              {SAMPLE_FOOD_ENTRIES.reduce((total, food) => total + food.calories, 0)} calories
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodLog;
