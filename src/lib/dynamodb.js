import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

// AWS Configuration
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

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
export const testDynamoConnection = async () => {
	try {
		const client = createDynamoClient();
		
		// Try to list tables to test connection
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

// Get connection status
export const getConnectionStatus = async () => {
	const result = await testDynamoConnection();
	return {
		timestamp: new Date().toISOString(),
		...result
	};
};
