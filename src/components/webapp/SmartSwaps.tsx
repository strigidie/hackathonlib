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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold heading-modern">Smart Swaps</h3>
          <p className="subheading-modern text-lg">AI-powered alternatives that elevate your nutrition</p>
        </div>
        <button className="premium-card px-6 py-3 flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-semibold transition-colors group">
          <Filter className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          <span>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {SAMPLE_SWAP_SUGGESTIONS.map((swap, index) => (
          <div key={index} className="swap-card-modern group">
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-2">
                <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Instead of</div>
                <div className="font-bold text-gray-900 text-lg">{swap.original}</div>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="text-xs text-emerald-600 font-bold uppercase tracking-wide">Recommended</div>
              <div className="text-xl font-bold text-gray-900">{swap.swap}</div>
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold">
                {swap.delta}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{swap.usage}</div>
                  <div className="text-xs text-gray-500">Community verified</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{swap.stores} nearby stores</span>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors text-sm font-semibold shadow-md hover:shadow-lg">
                  Find Stores
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="premium-card p-6 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <div className="text-left">
            <div className="font-bold text-gray-900">Personalized Recommendations</div>
            <div className="text-sm text-gray-600">Based on your goals and preferences</div>
          </div>
        </div>
        <button className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-2xl font-semibold hover:from-emerald-500 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Get More Suggestions
        </button>
      </div>
    </div>
  );
};

export default SmartSwaps;
