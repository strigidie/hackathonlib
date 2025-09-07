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
import { createProfile } from '@/lib/api';
import OnboardingContainer from './onboarding/OnboardingContainer';
import WebAppInterface from './webapp/WebAppInterface';
import PWAInstallPrompt from './PWAInstallPrompt';

const FoodietApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const handleOnboardingComplete = async (formData: UserProfile) => {
    setIsCreatingProfile(true);
    setProfileError(null);

    try {
      // Create profile via API
      const result = await createProfile(formData);
      
      if (result.success) {
        setUserProfile(formData);
        setCurrentView('webapp');
      } else {
        setProfileError(result.error || 'Failed to create profile');
      }
    } catch (error) {
      setProfileError('Network error: Please check your connection');
    } finally {
      setIsCreatingProfile(false);
    }
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
      <OnboardingContainer 
        onComplete={handleOnboardingComplete} 
        isLoading={isCreatingProfile}
        error={profileError}
      />
      <PWAInstallPrompt />
    </>
  );
};

export default FoodietApp;
