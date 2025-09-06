/**
 * SmartSwaps Component
 * 
 * Smart food swap suggestions
 * 
 * Key functionality:
 * - Displays alternative food suggestions
 * - Shows nutritional deltas
 * - Community usage statistics
 * - Store finder integration
 */

'use client';

import React from 'react';
import { ChevronRight, Users, MapPin, Filter } from 'lucide-react';
import { SAMPLE_SWAP_SUGGESTIONS } from '@/config/constants';

const SmartSwaps: React.FC = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Smart Swaps</h3>
          <p className="text-gray-600">Better alternatives for your recent foods</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_SWAP_SUGGESTIONS.map((swap, index) => (
          <div key={index} className="swap-card">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Instead of</div>
                <div className="font-semibold text-gray-900">{swap.original}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="text-sm text-emerald-600 font-medium">Try this</div>
              <div className="text-lg font-bold text-gray-900">{swap.swap}</div>
              <div className="swap-delta">{swap.delta}</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{swap.usage}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{swap.stores} nearby stores</span>
                </div>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  Find Stores
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartSwaps;
