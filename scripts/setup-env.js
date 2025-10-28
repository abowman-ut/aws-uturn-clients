#!/usr/bin/env node

/**
 * Environment Setup Script
 * Helps set up environment variables for different environments
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const environments = {
	local: 'env.local',
	production: 'env.production',
	example: 'env.example'
};

function setupEnvironment(envType = 'local') {
	const envFile = environments[envType];
	
	if (!envFile) {
		console.error(`❌ Unknown environment type: ${envType}`);
		console.log('Available environments: local, production, example');
		process.exit(1);
	}
	
	if (!existsSync(envFile)) {
		console.error(`❌ Environment file not found: ${envFile}`);
		console.log('Make sure you have the environment template files in your project root.');
		process.exit(1);
	}
	
	const targetFile = '.env';
	
	try {
		// Read the environment template
		const envContent = readFileSync(envFile, 'utf8');
		
		// Write to .env file
		writeFileSync(targetFile, envContent);
		
		console.log(`✅ Environment setup complete!`);
		console.log(`📁 Created: ${targetFile}`);
		console.log(`🔧 Environment: ${envType}`);
		console.log('');
		console.log('Next steps:');
		console.log('1. Review and update the values in .env file');
		console.log('2. Never commit .env to version control');
		console.log('3. Use different .env files for different environments');
		
	} catch (error) {
		console.error(`❌ Error setting up environment: ${error.message}`);
		process.exit(1);
	}
}

// Parse command line arguments
const args = process.argv.slice(2);
const envType = args[0] || 'local';

console.log('🚀 Setting up environment variables...');
console.log('');

setupEnvironment(envType);
