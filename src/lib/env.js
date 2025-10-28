// Environment variable management
// src/lib/env.js

/**
 * Environment variable configuration
 * Handles both local development and production environments
 */

// Default values for development
const defaultEnv = {
	// Database
	DATABASE_URL: 'file:./dev.db',
	DATABASE_TYPE: 'sqlite',
	
	// Application
	APP_NAME: 'AWS U-Turn Clients',
	APP_ENV: 'development',
	PORT: 5173,
	
	// API
	API_BASE_URL: 'http://localhost:5173',
	
	// Security (development only)
	JWT_SECRET: 'dev-secret-key-change-in-production',
	SESSION_SECRET: 'dev-session-secret',
	
	// Logging
	LOG_LEVEL: 'debug'
};

/**
 * Get environment variable with fallback to default
 * @param {string} key - Environment variable key
 * @param {string} defaultValue - Default value if not set
 * @returns {string} Environment variable value
 */
export function getEnv(key, defaultValue = null) {
	// In browser, we can't access process.env directly
	if (typeof window !== 'undefined') {
		// For client-side, use import.meta.env (Vite)
		return import.meta.env[key] || defaultValue || defaultEnv[key];
	}
	
	// For server-side, use process.env
	return process.env[key] || defaultValue || defaultEnv[key];
}

/**
 * Get all environment variables as an object
 * @returns {object} Environment variables object
 */
export function getAllEnv() {
	const env = {};
	
	// Get all default keys
	Object.keys(defaultEnv).forEach(key => {
		env[key] = getEnv(key);
	});
	
	return env;
}

/**
 * Validate required environment variables
 * @param {string[]} required - Array of required environment variable keys
 * @throws {Error} If required variables are missing
 */
export function validateEnv(required = []) {
	const missing = [];
	
	required.forEach(key => {
		if (!getEnv(key)) {
			missing.push(key);
		}
	});
	
	if (missing.length > 0) {
		throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
	}
}

/**
 * Check if we're in development mode
 * @returns {boolean} True if in development
 */
export function isDevelopment() {
	return getEnv('APP_ENV') === 'development' || getEnv('NODE_ENV') === 'development';
}

/**
 * Check if we're in production mode
 * @returns {boolean} True if in production
 */
export function isProduction() {
	return getEnv('APP_ENV') === 'production' || getEnv('NODE_ENV') === 'production';
}

// Export individual environment variables for convenience
export const env = {
	DATABASE_URL: getEnv('DATABASE_URL'),
	DATABASE_TYPE: getEnv('DATABASE_TYPE'),
	APP_NAME: getEnv('APP_NAME'),
	APP_ENV: getEnv('APP_ENV'),
	PORT: getEnv('PORT'),
	API_BASE_URL: getEnv('API_BASE_URL'),
	JWT_SECRET: getEnv('JWT_SECRET'),
	SESSION_SECRET: getEnv('SESSION_SECRET'),
	LOG_LEVEL: getEnv('LOG_LEVEL')
};
