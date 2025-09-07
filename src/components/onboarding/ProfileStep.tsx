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

import React, { useRef, useState } from 'react';
import { User, Upload, X } from 'lucide-react';
import { UserProfile } from '@/types';

interface ProfileStepProps {
  formData: UserProfile;
  updateFormData: (field: keyof UserProfile, value: string) => void;
}

const ProfileStep: React.FC<ProfileStepProps> = ({ formData, updateFormData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateFormData('profilePicture', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeProfilePicture = () => {
    updateFormData('profilePicture', '');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="relative inline-block">
          {formData.profilePicture ? (
            <div className="relative">
              <img 
                src={formData.profilePicture} 
                alt="Profile" 
                className="w-20 h-20 rounded-3xl object-cover"
              />
              <button
                onClick={removeProfilePicture}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div 
              className={`w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center cursor-pointer transition-all hover:from-gray-200 hover:to-gray-300 ${
                dragOver ? 'from-blue-100 to-blue-200' : ''
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="w-6 h-6 text-gray-600" />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
            className="hidden"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">Tap to add photo</p>
      </div>

      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => updateFormData('firstName', e.target.value)}
              placeholder="Enter first name"
              className="w-full py-4 px-4 rounded-2xl border-2 border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white transition-all font-medium focus:outline-none focus:border-gray-900 focus:bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateFormData('lastName', e.target.value)}
              placeholder="Enter last name"
              className="w-full py-4 px-4 rounded-2xl border-2 border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white transition-all font-medium focus:outline-none focus:border-gray-900 focus:bg-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Age
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateFormData('age', e.target.value)}
            placeholder="Enter your age"
            className="w-full py-4 px-4 rounded-2xl border-2 border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white transition-all font-medium focus:outline-none focus:border-gray-900 focus:bg-white"
            min="1"
            max="120"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Gender Identity
          </label>
          <select
            value={formData.sex}
            onChange={(e) => updateFormData('sex', e.target.value)}
            className="w-full py-4 px-4 rounded-2xl border-2 border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white transition-all font-medium focus:outline-none focus:border-gray-900 focus:bg-white appearance-none cursor-pointer"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
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
            className="w-full py-4 px-4 rounded-2xl border-2 border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white transition-all font-medium focus:outline-none focus:border-gray-900 focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
