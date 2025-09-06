/**
 * Centralized Error Management
 * 
 * Single source of truth for all application errors
 * Provides consistent error handling and user-friendly messages
 * 
 * Key functionality:
 * - Standardized error types and codes
 * - User-friendly error messages
 * - Error logging integration
 * - Environment-specific error handling
 */

import { logger } from './logger';

// Error types
export enum ErrorType {
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  NETWORK = 'NETWORK',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN'
}

// Error codes
export enum ErrorCode {
  // Validation errors (1000-1999)
  INVALID_INPUT = 1001,
  MISSING_REQUIRED_FIELD = 1002,
  INVALID_FORMAT = 1003,
  OUT_OF_RANGE = 1004,
  
  // Authentication errors (2000-2999)
  INVALID_CREDENTIALS = 2001,
  TOKEN_EXPIRED = 2002,
  TOKEN_INVALID = 2003,
  SESSION_EXPIRED = 2004,
  
  // Authorization errors (3000-3999)
  INSUFFICIENT_PERMISSIONS = 3001,
  ACCESS_DENIED = 3002,
  
  // Not found errors (4000-4999)
  USER_NOT_FOUND = 4001,
  FOOD_NOT_FOUND = 4002,
  STORE_NOT_FOUND = 4003,
  
  // Network errors (5000-5999)
  CONNECTION_FAILED = 5001,
  TIMEOUT = 5002,
  API_ERROR = 5003,
  
  // Server errors (6000-6999)
  INTERNAL_ERROR = 6001,
  DATABASE_ERROR = 6002,
  EXTERNAL_SERVICE_ERROR = 6003,
  
  // Client errors (7000-7999)
  BROWSER_NOT_SUPPORTED = 7001,
  FEATURE_NOT_AVAILABLE = 7002
}

// Error interface
export interface AppError {
  type: ErrorType;
  code: ErrorCode;
  message: string;
  userMessage: string;
  details?: any;
  timestamp: string;
  stack?: string;
}

// Error messages mapping
const errorMessages: Record<ErrorCode, { message: string; userMessage: string }> = {
  // Validation errors
  [ErrorCode.INVALID_INPUT]: {
    message: 'Invalid input provided',
    userMessage: 'Please check your input and try again'
  },
  [ErrorCode.MISSING_REQUIRED_FIELD]: {
    message: 'Required field is missing',
    userMessage: 'Please fill in all required fields'
  },
  [ErrorCode.INVALID_FORMAT]: {
    message: 'Invalid format provided',
    userMessage: 'Please use the correct format'
  },
  [ErrorCode.OUT_OF_RANGE]: {
    message: 'Value is out of acceptable range',
    userMessage: 'Please enter a value within the allowed range'
  },
  
  // Authentication errors
  [ErrorCode.INVALID_CREDENTIALS]: {
    message: 'Invalid credentials provided',
    userMessage: 'Please check your login details and try again'
  },
  [ErrorCode.TOKEN_EXPIRED]: {
    message: 'Authentication token has expired',
    userMessage: 'Your session has expired. Please log in again'
  },
  [ErrorCode.TOKEN_INVALID]: {
    message: 'Invalid authentication token',
    userMessage: 'Please log in again'
  },
  [ErrorCode.SESSION_EXPIRED]: {
    message: 'User session has expired',
    userMessage: 'Your session has expired. Please log in again'
  },
  
  // Authorization errors
  [ErrorCode.INSUFFICIENT_PERMISSIONS]: {
    message: 'Insufficient permissions for this action',
    userMessage: 'You don\'t have permission to perform this action'
  },
  [ErrorCode.ACCESS_DENIED]: {
    message: 'Access denied',
    userMessage: 'Access to this resource is denied'
  },
  
  // Not found errors
  [ErrorCode.USER_NOT_FOUND]: {
    message: 'User not found',
    userMessage: 'User account not found'
  },
  [ErrorCode.FOOD_NOT_FOUND]: {
    message: 'Food item not found',
    userMessage: 'Food item not found in our database'
  },
  [ErrorCode.STORE_NOT_FOUND]: {
    message: 'Store not found',
    userMessage: 'Store not found in your area'
  },
  
  // Network errors
  [ErrorCode.CONNECTION_FAILED]: {
    message: 'Connection failed',
    userMessage: 'Unable to connect. Please check your internet connection'
  },
  [ErrorCode.TIMEOUT]: {
    message: 'Request timeout',
    userMessage: 'Request timed out. Please try again'
  },
  [ErrorCode.API_ERROR]: {
    message: 'API error occurred',
    userMessage: 'Something went wrong. Please try again later'
  },
  
  // Server errors
  [ErrorCode.INTERNAL_ERROR]: {
    message: 'Internal server error',
    userMessage: 'Something went wrong on our end. Please try again later'
  },
  [ErrorCode.DATABASE_ERROR]: {
    message: 'Database error occurred',
    userMessage: 'Unable to process your request. Please try again later'
  },
  [ErrorCode.EXTERNAL_SERVICE_ERROR]: {
    message: 'External service error',
    userMessage: 'Service temporarily unavailable. Please try again later'
  },
  
  // Client errors
  [ErrorCode.BROWSER_NOT_SUPPORTED]: {
    message: 'Browser not supported',
    userMessage: 'Your browser is not supported. Please use a modern browser'
  },
  [ErrorCode.FEATURE_NOT_AVAILABLE]: {
    message: 'Feature not available',
    userMessage: 'This feature is not available in your current setup'
  }
};

// Create error function
export const createError = (
  type: ErrorType,
  code: ErrorCode,
  details?: any,
  originalError?: Error
): AppError => {
  const errorInfo = errorMessages[code];
  const error: AppError = {
    type,
    code,
    message: errorInfo.message,
    userMessage: errorInfo.userMessage,
    details,
    timestamp: new Date().toISOString(),
    stack: originalError?.stack
  };
  
  // Log the error
  logger.error(
    'ERROR_MANAGER',
    'createError',
    `Error created: ${error.message}`,
    { error, originalError }
  );
  
  return error;
};

// Error handling utilities
export const handleError = (error: unknown, context?: string): AppError => {
  if (error instanceof Error) {
    // Handle known application errors
    if ('code' in error && typeof error.code === 'number') {
      return createError(
        ErrorType.CLIENT,
        error.code as ErrorCode,
        { context, originalMessage: error.message },
        error
      );
    }
    
    // Handle generic errors
    return createError(
      ErrorType.UNKNOWN,
      ErrorCode.INTERNAL_ERROR,
      { context, originalMessage: error.message },
      error
    );
  }
  
  // Handle unknown error types
  return createError(
    ErrorType.UNKNOWN,
    ErrorCode.INTERNAL_ERROR,
    { context, originalError: error }
  );
};

// Validation error helpers
export const createValidationError = (field: string, message: string): AppError => {
  return createError(
    ErrorType.VALIDATION,
    ErrorCode.INVALID_INPUT,
    { field, message }
  );
};

// Network error helpers
export const createNetworkError = (url: string, status?: number): AppError => {
  return createError(
    ErrorType.NETWORK,
    ErrorCode.API_ERROR,
    { url, status }
  );
};

// Authentication error helpers
export const createAuthError = (code: ErrorCode): AppError => {
  return createError(ErrorType.AUTHENTICATION, code);
};

// Export error types and utilities
export default {
  ErrorType,
  ErrorCode,
  createError,
  handleError,
  createValidationError,
  createNetworkError,
  createAuthError
};
