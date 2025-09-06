/**
 * TypeScript type definitions for Foodiet app
 * Centralized type definitions following single-source-of-truth principle
 */

// User Profile Types
export interface UserProfile {
  age: string;
  sex: 'Male' | 'Female';
  location: string;
  target: HealthTarget;
}

// Health Target Types
export type HealthTarget = 'normal' | 'sporty' | 'ironman';

export interface TargetConfig {
  id: HealthTarget;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  calories: string;
  activity: string;
  popular: boolean;
}

// Onboarding Types
export interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  component: string;
}

// Daily Stats Types
export interface DailyStats {
  calories: { current: number; target: number; percentage: number };
  protein: { current: number; target: number; percentage: number };
  sugar: { current: number; target: number; percentage: number };
  activity: { current: number; target: number; percentage: number };
}

// Food Log Types
export interface FoodEntry {
  name: string;
  calories: number;
  time: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

// Swap Suggestion Types
export interface SwapSuggestion {
  original: string;
  swap: string;
  delta: string;
  usage: string;
  stores: number;
}

// Feature Types
export interface AppFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

// App State Types
export type AppView = 'onboarding' | 'webapp';

export interface AppState {
  currentView: AppView;
  currentStep: number;
  formData: UserProfile;
  isAnimating: boolean;
}

// Navigation Types
export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}
