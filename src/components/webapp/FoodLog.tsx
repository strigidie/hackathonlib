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
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Today's Log</h3>
        <button className="text-emerald-600 hover:text-emerald-700 font-medium">
          View All
        </button>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {SAMPLE_FOOD_ENTRIES.map((food, index) => (
          <div key={index} className="food-entry">
            <div className="flex items-center space-x-3">
              <div className="food-entry-icon">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{food.name}</div>
                <div className="text-sm text-gray-500">
                  {food.time} • {food.category}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">{food.calories} cal</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodLog;
