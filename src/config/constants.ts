/**
 * Application constants and configuration
 * Centralized configuration following single-source-of-truth principle
 */

import { 
  Camera, 
  Mic, 
  Type, 
  Users, 
  Zap, 
  Map,
  Home,
  Utensils,
  Activity,
  BarChart3,
  MapPin
} from 'lucide-react';
import { TargetConfig, OnboardingStep, AppFeature, NavItem } from '@/types';

// Onboarding Steps Configuration
export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Fuel Your Pursuit',
    subtitle: 'Performance nutrition meets intelligent tracking',
    component: 'welcome'
  },
  {
    id: 'profile',
    title: 'Your Foundation',
    subtitle: 'Build your personalized nutrition profile',
    component: 'profile'
  },
  {
    id: 'targets',
    title: 'Define Your Goal',
    subtitle: 'Choose your performance pathway',
    component: 'targets'
  }
];

// Health Target Configurations
export const HEALTH_TARGETS: TargetConfig[] = [
  {
    id: 'normal',
    name: 'Foundation',
    description: 'Balanced nutrition for sustainable wellness',
    icon: '⚖️',
    gradient: 'from-slate-400 to-slate-600',
    calories: 'Balanced intake',
    activity: 'Moderate activity',
    popular: false
  },
  {
    id: 'sporty',
    name: 'Performance',
    description: 'Optimized for active lifestyles and training',
    icon: '🏃‍♂️',
    gradient: 'from-blue-500 to-indigo-600',
    calories: '+15% calories',
    activity: 'Enhanced performance',
    popular: true
  },
  {
    id: 'ironman',
    name: 'IronMan',
    description: 'Maximum performance nutrition for athletes',
    icon: '🔥',
    gradient: 'from-red-500 to-orange-600',
    calories: '+35% calories',
    activity: 'Elite training',
    popular: false
  }
];

// App Features Configuration
export const APP_FEATURES: AppFeature[] = [
  {
    icon: Camera,
    title: 'Vision Capture',
    description: 'AI-powered food recognition from any angle',
    color: 'text-emerald-600'
  },
  {
    icon: Mic,
    title: 'Voice Intelligence',
    description: 'Natural language food and activity logging',
    color: 'text-blue-600'
  },
  {
    icon: Type,
    title: 'Quick Input',
    description: 'Lightning-fast manual tracking',
    color: 'text-purple-600'
  },
  {
    icon: Users,
    title: 'Community Wisdom',
    description: 'Real swaps from your performance community',
    color: 'text-orange-600'
  },
  {
    icon: Zap,
    title: 'AI Optimization',
    description: 'Personalized recommendations that adapt',
    color: 'text-yellow-600'
  },
  {
    icon: Map,
    title: 'Local Discovery',
    description: 'Find better options wherever you are',
    color: 'text-red-600'
  }
];

// Navigation Items Configuration
export const NAV_ITEMS: NavItem[] = [
  {
    name: 'Dashboard',
    href: '#',
    icon: Home,
    active: true
  },
  {
    name: 'Food Log',
    href: '#',
    icon: Utensils
  },
  {
    name: 'Activity',
    href: '#',
    icon: Activity
  },
  {
    name: 'Progress',
    href: '#',
    icon: BarChart3
  },
  {
    name: 'Community',
    href: '#',
    icon: Users
  },
  {
    name: 'Stores',
    href: '#',
    icon: MapPin
  }
];

// Sample Data for Development
export const SAMPLE_DAILY_STATS = {
  calories: { current: 1842, target: 2400, percentage: 77 },
  protein: { current: 82, target: 120, percentage: 68 },
  sugar: { current: 45, target: 60, percentage: 75 },
  activity: { current: 45, target: 60, percentage: 75 }
};

export const SAMPLE_FOOD_ENTRIES = [
  { name: 'Overnight Oats', calories: 340, time: '8:30 AM', category: 'breakfast' as const },
  { name: 'Greek Yogurt', calories: 150, time: '10:15 AM', category: 'snack' as const },
  { name: 'Quinoa Bowl', calories: 520, time: '12:45 PM', category: 'lunch' as const },
  { name: 'Protein Shake', calories: 280, time: '3:20 PM', category: 'snack' as const }
];

export const SAMPLE_SWAP_SUGGESTIONS = [
  {
    original: 'White Rice',
    swap: 'Cauliflower Rice',
    delta: '-120 kcal',
    usage: '147 community swaps',
    stores: 3
  },
  {
    original: 'Regular Pasta',
    swap: 'Lentil Pasta',
    delta: '+8g protein',
    usage: '89 community swaps',
    stores: 5
  },
  {
    original: 'Soda',
    swap: 'Sparkling Water',
    delta: '-140 kcal, -35g sugar',
    usage: '256 community swaps',
    stores: 8
  }
];
