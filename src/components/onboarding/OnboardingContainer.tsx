/**
 * OnboardingContainer Component
 * 
 * Main container for the onboarding flow
 * Handles step navigation, form state, and transitions
 * 
 * Key functionality:
 * - Manages onboarding step progression
 * - Handles form data state
 * - Controls view transitions between onboarding and webapp
 * - Provides step validation logic
 */

'use client';

import React, { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { UserProfile } from '@/types';
import { ONBOARDING_STEPS } from '@/config/constants';
import WelcomeStep from './WelcomeStep';
import ProfileStep from './ProfileStep';
import TargetsStep from './TargetsStep';

interface OnboardingContainerProps {
  onComplete: (formData: UserProfile) => void;
}

const OnboardingContainer: React.FC<OnboardingContainerProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    profilePicture: '',
    age: '',
    sex: 'Male',
    location: '',
    target: 'normal'
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 150);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const updateFormData = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepComplete = (): boolean => {
    const step = ONBOARDING_STEPS[currentStep];
    switch (step.id) {
      case 'welcome':
        return true;
      case 'profile':
        return !!(formData.firstName && formData.lastName && formData.age && formData.sex && formData.location);
      case 'targets':
        return !!formData.target;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    const step = ONBOARDING_STEPS[currentStep];
    switch (step.component) {
      case 'welcome':
        return <WelcomeStep />;
      case 'profile':
        return <ProfileStep formData={formData} updateFormData={updateFormData} />;
      case 'targets':
        return <TargetsStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-md mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Step {currentStep + 1} of {ONBOARDING_STEPS.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round((currentStep + 1) / ONBOARDING_STEPS.length * 100)}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(currentStep + 1) / ONBOARDING_STEPS.length * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className={`transition-all duration-200 ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 translate-x-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              {ONBOARDING_STEPS[currentStep].title}
            </h2>
            <p className="text-gray-600 text-lg">
              {ONBOARDING_STEPS[currentStep].subtitle}
            </p>
          </div>

          <div className="mb-16">
            {renderStepContent()}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {currentStep > 0 ? (
            <button
              onClick={prevStep}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={nextStep}
            disabled={!isStepComplete()}
            className={`btn btn-primary flex items-center space-x-3 ${
              !isStepComplete() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="text-lg">
              {currentStep === ONBOARDING_STEPS.length - 1 ? 'Enter Foodiet' : 'Continue'}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingContainer;
