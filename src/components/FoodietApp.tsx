/**
 * FoodietApp Component
 * 
 * Main application component that orchestrates the entire app
 * 
 * Key functionality:
 * - Manages app state and view transitions
 * - Handles onboarding completion
 * - Renders appropriate view based on state
 * - Central state management for the application
 */

'use client';

import React, { useState } from 'react';
import { UserProfile, AppView } from '@/types';
import OnboardingContainer from './onboarding/OnboardingContainer';
import WebAppInterface from './webapp/WebAppInterface';

const FoodietApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleOnboardingComplete = (formData: UserProfile) => {
    setUserProfile(formData);
    setCurrentView('webapp');
  };

  if (currentView === 'webapp' && userProfile) {
    return <WebAppInterface userProfile={userProfile} />;
  }

  return <OnboardingContainer onComplete={handleOnboardingComplete} />;
};

export default FoodietApp;
