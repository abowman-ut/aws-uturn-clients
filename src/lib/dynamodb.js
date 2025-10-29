import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

// Initialize the DynamoDB client with default region
const client = new DynamoDBClient({
    region: "us-east-2",
    credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    },
});

// Create a DynamoDB Document client
const docClient = DynamoDBDocumentClient.from(client);

// Test DynamoDB connection
export const testDynamoConnection = async () => {
	try {
		// Check if credentials are available
		if (!process.env.MY_AWS_ACCESS_KEY_ID || !process.env.MY_AWS_SECRET_ACCESS_KEY) {
			return { 
				status: 'error', 
				message: 'AWS credentials not configured',
				region: 'us-east-2'
			};
		}

		// Try to scan a test table to check connection
		const command = new ScanCommand({
			TableName: 'test-connection-table',
			Limit: 1
		});
		
		await docClient.send(command);
		return { 
			status: 'connected', 
			message: 'Successfully connected to DynamoDB',
			region: 'us-east-2'
		};
	} catch (error) {
		// Check if it's a table not found error (which means connection works)
		if (error.name === 'ResourceNotFoundException') {
			return { 
				status: 'connected', 
				message: 'Connected to DynamoDB (table not found - expected)',
				region: 'us-east-2'
			};
		}
		
		// Check for credential errors
		if (error.name === 'CredentialsProviderError' || 
			error.message.includes('credentials') || 
			error.message.includes('InvalidUserID.NotFound') ||
			error.message.includes('security token')) {
			return { 
				status: 'error', 
				message: 'AWS credentials not configured or invalid',
				region: 'us-east-2'
			};
		}
		
		// Other connection errors
		return { 
			status: 'error', 
			message: `Connection failed: ${error.message}`,
			region: 'us-east-2'
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

// Helper functions for common operations
export const scanTable = async (tableName, options = {}) => {
	const command = new ScanCommand({
		TableName: tableName,
		...options
	});
	return await docClient.send(command);
};

export const getItem = async (tableName, key) => {
	const command = new GetCommand({
		TableName: tableName,
		Key: key
	});
	return await docClient.send(command);
};

export const putItem = async (tableName, item) => {
	const command = new PutCommand({
		TableName: tableName,
		Item: item
	});
	return await docClient.send(command);
};

// Export the clients for use in service layers
export { client, docClient };
