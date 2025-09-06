/**
 * ProfileStep Component
 * 
 * Second step of the onboarding flow
 * Collects user profile information (age, sex, location)
 * 
 * Key functionality:
 * - Age input with number validation
 * - Sex selection (Male/Female)
 * - Location input for store finder
 * - Form validation and state management
 */

'use client';

import React from 'react';
import { User } from 'lucide-react';
import { UserProfile } from '@/types';

interface ProfileStepProps {
  formData: UserProfile;
  updateFormData: (field: keyof UserProfile, value: string) => void;
}

const ProfileStep: React.FC<ProfileStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6">
          <User className="w-10 h-10 text-gray-700" />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Age
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateFormData('age', e.target.value)}
            placeholder="Enter your age"
            className="input"
            min="1"
            max="120"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Sex
          </label>
          <div className="grid grid-cols-2 gap-4">
            {['Male', 'Female'].map((sex) => (
              <button
                key={sex}
                onClick={() => updateFormData('sex', sex)}
                className={`py-4 px-6 rounded-2xl border-2 transition-all font-semibold ${
                  formData.sex === sex
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white'
                }`}
              >
                {sex}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => updateFormData('location', e.target.value)}
            placeholder="City, State"
            className="input"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
