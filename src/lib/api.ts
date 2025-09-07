/**
 * API Service Utilities
 * 
 * Centralized API calls and error handling
 * Calls Vercel API directly
 */

import { UserProfile } from '@/types';

export interface CreateProfileResponse {
  success: boolean;
  data?: any;
  profileId?: string;
  error?: string;
  details?: string;
}

export interface CreateProfilePayload extends Omit<UserProfile, 'target'> {
  height?: string;
  weight?: string;
}

interface ExternalAPIPayload {
  key: string;
  name: string;
  lastname: string;
  picture: string;
  location: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
}

/**
 * Creates a user profile via the external Vercel API
 */
export async function createProfile(profileData: CreateProfilePayload): Promise<CreateProfileResponse> {
  try {
    // Validate required fields
    if (!profileData.firstName || !profileData.lastName || !profileData.age || !profileData.sex || !profileData.location) {
      return {
        success: false,
        error: 'Missing required profile fields',
        details: 'firstName, lastName, age, sex, and location are required'
      };
    }

    // Validate age is a number
    const ageNumber = parseInt(profileData.age);
    if (isNaN(ageNumber) || ageNumber <= 0 || ageNumber > 150) {
      return {
        success: false,
        error: 'Invalid age provided',
        details: `Age must be a valid number between 1 and 150, got: ${profileData.age}`
      };
    }

    // Validate height and weight defaults
    const heightValue = profileData.height ? parseInt(profileData.height) : 178;
    const weightValue = profileData.weight ? parseInt(profileData.weight) : 72;

    if (isNaN(heightValue) || isNaN(weightValue)) {
      return {
        success: false,
        error: 'Invalid height or weight values',
        details: `Height: ${profileData.height}, Weight: ${profileData.weight}`
      };
    }

    // Map UI data to external API format (matching Flask API requirements exactly)
    const apiPayload: ExternalAPIPayload = {
      key: 'a55Z4Sk8', // API Local Key - matches your APP_KEY environment variable
      name: profileData.firstName.trim(),
      lastname: profileData.lastName.trim(),
      picture: profileData.profilePicture || '[picture]', // Default as shown in your example
      location: profileData.location.trim(),
      age: ageNumber,
      gender: profileData.sex === 'Male' ? 'M' : profileData.sex === 'Female' ? 'F' : 'O',
      height: heightValue,
      weight: weightValue
    };

    // Validate all required fields are present and not empty
    const requiredFields = ['key', 'name', 'lastname', 'picture', 'location', 'age', 'gender', 'height', 'weight'];
    for (const field of requiredFields) {
      const value = apiPayload[field as keyof ExternalAPIPayload];
      if (value === undefined || value === null || value === '') {
        return {
          success: false,
          error: `Missing or empty required field: ${field}`,
          details: `Field ${field} has value: ${value}`
        };
      }
    }

    console.log('Calling API with payload:', JSON.stringify(apiPayload, null, 2));

    // Call Vercel API directly (bypassing local proxy due to connection issues)
    const apiUrl = 'https://man-vs-machine-vert.vercel.app/api/create_profile';
    
    console.log('API URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiPayload),
      mode: 'cors', // Explicitly set CORS mode
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', errorText);
      throw new Error(`API failed: ${response.status} ${response.statusText}. Response: ${errorText}`);
    }

    const result = await response.json();
    console.log('API result:', result);

    return {
      success: true,
      data: result,
      profileId: result.id || null
    };

  } catch (error) {
    console.error('Profile creation failed:', error);
    
    // Provide specific error messages for common network issues
    let errorMessage = 'Failed to create profile';
    let errorDetails = 'Unknown error';
    
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Network connection error';
        errorDetails = 'Unable to reach the server. Please check your internet connection and try again.';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'Cross-origin request blocked';
        errorDetails = 'The request was blocked by browser security policy. Please contact support.';
      } else {
        errorDetails = error.message;
      }
    }
    
    return {
      success: false,
      error: errorMessage,
      details: errorDetails
    };
  }
}

/**
 * API error handler utility
 */
export function handleAPIError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
