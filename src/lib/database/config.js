// AWS Configuration
export const config = {
	aws: {
		region: process.env.AWS_REGION || 'us-east-1',
		accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
	},
	dynamodb: {
		tableName: process.env.DYNAMODB_TABLE_NAME || 'aws-uturn-clients-table'
	}
};

// Environment validation
export function validateConfig() {
	const required = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'];
	const missing = required.filter(key => !process.env[key]);
	
	if (missing.length > 0) {
		console.warn(`Missing environment variables: ${missing.join(', ')}`);
		console.warn('Please set these variables in your .env file or environment');
		return false;
	}
	
	return true;
}
