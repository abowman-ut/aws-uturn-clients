import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { json } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables manually
let envVars = {};
try {
	const envPath = join(process.cwd(), '.env');
	const envContent = readFileSync(envPath, 'utf8');
	envContent.split('\n').forEach(line => {
		const [key, ...valueParts] = line.split('=');
		if (key && valueParts.length > 0) {
			envVars[key.trim()] = valueParts.join('=').trim();
		}
	});
} catch (error) {
	console.log('Could not load .env file:', error.message);
}

// AWS Configuration
const AWS_REGION = envVars.AWS_REGION || process.env.AWS_REGION || 'us-east-2';
const AWS_ACCESS_KEY_ID = envVars.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = envVars.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

// Create DynamoDB client
const createDynamoClient = () => {
	const client = new DynamoDBClient({
		region: AWS_REGION,
		...(AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && {
			credentials: {
				accessKeyId: AWS_ACCESS_KEY_ID,
				secretAccessKey: AWS_SECRET_ACCESS_KEY
			}
		})
	});
	
	return DynamoDBDocumentClient.from(client);
};

// Test DynamoDB connection
const testDynamoConnection = async () => {
	try {
		const client = createDynamoClient();
		
		// Try to scan a test table to check connection
		const command = new ScanCommand({
			TableName: 'test-connection-table',
			Limit: 1
		});
		
		await client.send(command);
		return { 
			status: 'connected', 
			message: 'Successfully connected to DynamoDB',
			region: AWS_REGION
		};
	} catch (error) {
		// Check if it's a table not found error (which means connection works)
		if (error.name === 'ResourceNotFoundException') {
			return { 
				status: 'connected', 
				message: 'Connected to DynamoDB (table not found - expected)',
				region: AWS_REGION
			};
		}
		
		// Check for credential errors
		if (error.name === 'CredentialsProviderError' || error.message.includes('credentials')) {
			return { 
				status: 'error', 
				message: 'AWS credentials not configured',
				region: AWS_REGION
			};
		}
		
		// Other connection errors
		return { 
			status: 'error', 
			message: `Connection failed: ${error.message}`,
			region: AWS_REGION
		};
	}
};

export async function GET() {
	try {
		const result = await testDynamoConnection();
		return json({
			timestamp: new Date().toISOString(),
			...result
		});
	} catch (error) {
		return json({
			status: 'error',
			message: `Server error: ${error.message}`,
			region: AWS_REGION,
			timestamp: new Date().toISOString()
		}, { status: 500 });
	}
}
