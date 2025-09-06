/**
 * Home Page Component
 * 
 * Main entry point for the Foodiet application
 * Renders the complete FoodietApp component
 * 
 * Key functionality:
 * - Serves as the root page component
 * - Imports and renders the main FoodietApp
 * - Provides the entry point for the application
 */

import FoodietApp from '@/components/FoodietApp';

export default function Home() {
  return <FoodietApp />;
}
