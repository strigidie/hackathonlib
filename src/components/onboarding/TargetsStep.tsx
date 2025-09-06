/**
 * TargetsStep Component
 * 
 * Third step of the onboarding flow
 * Allows users to select their health and performance target
 * 
 * Key functionality:
 * - Displays three target options (Normal, Sporty, IronMan)
 * - Shows target descriptions and benefits
 * - Handles target selection with visual feedback
 * - Displays popular target badge
 */

'use client';

import React from 'react';
import { Target } from 'lucide-react';
import { UserProfile } from '@/types';
import { HEALTH_TARGETS } from '@/config/constants';

interface TargetsStepProps {
  formData: UserProfile;
  updateFormData: (field: keyof UserProfile, value: string) => void;
}

const TargetsStep: React.FC<TargetsStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6">
          <Target className="w-10 h-10 text-gray-700" />
        </div>
      </div>

      <div className="space-y-4">
        {HEALTH_TARGETS.map((target) => (
          <button
            key={target.id}
            onClick={() => updateFormData('target', target.id)}
            className={`w-full p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
              formData.target === target.id
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white'
            }`}
          >
            {target.popular && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
                Popular
              </div>
            )}
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{target.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{target.name}</h3>
                <p className={`text-base mb-3 ${
                  formData.target === target.id ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {target.description}
                </p>
                <div className="flex space-x-6 text-sm">
                  <span className={`${
                    formData.target === target.id ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    • {target.calories}
                  </span>
                  <span className={`${
                    formData.target === target.id ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    • {target.activity}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TargetsStep;
