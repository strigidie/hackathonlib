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
import PWAInstallPrompt from './PWAInstallPrompt';

const FoodietApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleOnboardingComplete = (formData: UserProfile) => {
    setUserProfile(formData);
    setCurrentView('webapp');
  };

  if (currentView === 'webapp' && userProfile) {
    return (
      <>
        <WebAppInterface userProfile={userProfile} />
        <PWAInstallPrompt />
      </>
    );
  }

  return (
    <>
      <OnboardingContainer onComplete={handleOnboardingComplete} />
      <PWAInstallPrompt />
    </>
  );
};

export default FoodietApp;
