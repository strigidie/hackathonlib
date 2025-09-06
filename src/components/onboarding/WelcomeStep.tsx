/**
 * WelcomeStep Component
 * 
 * First step of the onboarding flow
 * Introduces the app with branding and value proposition
 * 
 * Key functionality:
 * - Displays app logo and branding
 * - Shows value proposition
 * - Provides introduction to the app's purpose
 */

'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

const WelcomeStep: React.FC = () => {
  return (
    <div className="text-center space-y-10">
      <div className="relative">
        <div className="w-40 h-40 mx-auto bg-gradient-to-br from-gray-800 to-black rounded-3xl flex items-center justify-center shadow-2xl">
          <div className="text-white text-5xl font-bold">F</div>
        </div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="space-y-6">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">Fuel Your Pursuit</h1>
        <p className="text-xl text-gray-600 leading-relaxed font-light">
          Performance nutrition meets intelligent tracking
        </p>
        <div className="max-w-sm mx-auto">
          <p className="text-gray-500 leading-relaxed">
            Discover food alternatives that elevate your performance, backed by AI insights and real community choices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;
