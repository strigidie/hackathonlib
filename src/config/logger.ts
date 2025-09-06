/**
 * Centralized Logging System
 * 
 * Single source of truth for all application logging
 * Follows structured logging with category-based organization
 * 
 * Key functionality:
 * - Structured logging with FILE_NAME_FUNCTION_LOG_TYPE format
 * - Color-coded console output
 * - Configurable log levels
 * - Environment-specific logging behavior
 */

import { env } from './env';

// Log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  SECURITY = 4,
  HIPAA = 5,
  TELEMETRY = 6
}

// Log types
export enum LogType {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  SECURITY = 'SECURITY',
  HIPAA = 'HIPAA',
  TELEMETRY = 'TELEMETRY'
}

// Color codes for console output
const colors = {
  [LogType.DEBUG]: '\x1b[36m',    // Cyan
  [LogType.INFO]: '\x1b[32m',     // Green
  [LogType.WARN]: '\x1b[33m',     // Yellow
  [LogType.ERROR]: '\x1b[31m',    // Red
  [LogType.SECURITY]: '\x1b[35m', // Magenta
  [LogType.HIPAA]: '\x1b[41m',    // Red background
  [LogType.TELEMETRY]: '\x1b[34m' // Blue
};

const resetColor = '\x1b[0m';

// Log configuration
const logConfig = {
  console: {
    enabled: true,
    level: env.isDevelopment ? LogLevel.DEBUG : LogLevel.INFO
  },
  firestore: {
    enabled: env.isProduction,
    level: LogLevel.INFO
  },
  server: {
    enabled: env.isProduction,
    level: LogLevel.ERROR
  },
  admin: {
    enabled: env.isProduction,
    level: LogLevel.SECURITY
  }
};

// Log entry interface
interface LogEntry {
  timestamp: string;
  level: LogType;
  category: string;
  message: string;
  data?: unknown;
  userId?: string;
  sessionId?: string;
}

// Create structured log entry
const createLogEntry = (
  fileName: string,
  functionName: string,
  logType: LogType,
  message: string,
  data?: unknown,
  userId?: string,
  sessionId?: string
): LogEntry => {
  const category = `${fileName}_${functionName}_${logType}`;
  
  return {
    timestamp: new Date().toISOString(),
    level: logType,
    category,
    message,
    data,
    userId,
    sessionId
  };
};

// Console logging
const logToConsole = (entry: LogEntry): void => {
  if (!logConfig.console.enabled) return;
  
  const color = colors[entry.level];
  const timestamp = new Date(entry.timestamp).toLocaleTimeString();
  
  console.log(
    `${color}[${entry.level}]${resetColor} ` +
    `${color}${timestamp}${resetColor} ` +
    `${color}${entry.category}${resetColor}: ` +
    `${entry.message}`,
    entry.data ? entry.data : ''
  );
};

// Firestore logging (placeholder for future implementation)
const logToFirestore = async (entry: LogEntry): Promise<void> => {
  if (!logConfig.firestore.enabled) return;
  
  // TODO: Implement Firestore logging
  console.log('Firestore logging not implemented yet:', entry);
};

// Server logging (placeholder for future implementation)
const logToServer = async (entry: LogEntry): Promise<void> => {
  if (!logConfig.server.enabled) return;
  
  // TODO: Implement server-side logging
  console.log('Server logging not implemented yet:', entry);
};

// Admin logging (placeholder for future implementation)
const logToAdmin = async (entry: LogEntry): Promise<void> => {
  if (!logConfig.admin.enabled) return;
  
  // TODO: Implement admin logging
  console.log('Admin logging not implemented yet:', entry);
};

// Main logging function
const log = (
  fileName: string,
  functionName: string,
  logType: LogType,
  message: string,
  data?: unknown,
  userId?: string,
  sessionId?: string
): void => {
  const entry = createLogEntry(fileName, functionName, logType, message, data, userId, sessionId);
  
  // Log to console
  logToConsole(entry);
  
  // Log to other destinations based on configuration
  if (logConfig.firestore.enabled) {
    logToFirestore(entry);
  }
  
  if (logConfig.server.enabled) {
    logToServer(entry);
  }
  
  if (logConfig.admin.enabled) {
    logToAdmin(entry);
  }
};

// Convenience functions for different log types
export const logger = {
  debug: (fileName: string, functionName: string, message: string, data?: unknown) =>
    log(fileName, functionName, LogType.DEBUG, message, data),
  
  info: (fileName: string, functionName: string, message: string, data?: unknown) =>
    log(fileName, functionName, LogType.INFO, message, data),
  
  warn: (fileName: string, functionName: string, message: string, data?: unknown) =>
    log(fileName, functionName, LogType.WARN, message, data),
  
  error: (fileName: string, functionName: string, message: string, data?: unknown) =>
    log(fileName, functionName, LogType.ERROR, message, data),
  
  security: (fileName: string, functionName: string, message: string, data?: unknown) =>
    log(fileName, functionName, LogType.SECURITY, message, data),
  
  hipaa: (fileName: string, functionName: string, message: string, data?: unknown) =>
    log(fileName, functionName, LogType.HIPAA, message, data),
  
  telemetry: (fileName: string, functionName: string, message: string, data?: unknown) =>
    log(fileName, functionName, LogType.TELEMETRY, message, data)
};

export default logger;
