import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client
const client = new DynamoDBClient({
	region: process.env.AWS_REGION || 'us-east-1',
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
	}
});

// Create DynamoDB Document Client
export const docClient = DynamoDBDocumentClient.from(client);

/**
 * Put an item into DynamoDB table
 * @param {string} tableName - Name of the DynamoDB table
 * @param {Object} item - Item to put into the table
 * @returns {Promise<Object>} - Result of the put operation
 */
export async function putItem(tableName, item) {
	try {
		const command = new PutCommand({
			TableName: tableName,
			Item: item
		});
		
		const result = await docClient.send(command);
		return { success: true, data: result };
	} catch (error) {
		console.error('Error putting item:', error);
		return { success: false, error: error.message };
	}
}

/**
 * Get an item from DynamoDB table
 * @param {string} tableName - Name of the DynamoDB table
 * @param {Object} key - Primary key of the item to get
 * @returns {Promise<Object>} - Result containing the item
 */
export async function getItem(tableName, key) {
	try {
		const command = new GetCommand({
			TableName: tableName,
			Key: key
		});
		
		const result = await docClient.send(command);
		return { success: true, data: result.Item };
	} catch (error) {
		console.error('Error getting item:', error);
		return { success: false, error: error.message };
	}
}

/**
 * Update an item in DynamoDB table
 * @param {string} tableName - Name of the DynamoDB table
 * @param {Object} key - Primary key of the item to update
 * @param {Object} updateExpression - Update expression
 * @param {Object} expressionAttributeValues - Values for the update expression
 * @returns {Promise<Object>} - Result of the update operation
 */
export async function updateItem(tableName, key, updateExpression, expressionAttributeValues) {
	try {
		const command = new UpdateCommand({
			TableName: tableName,
			Key: key,
			UpdateExpression: updateExpression,
			ExpressionAttributeValues: expressionAttributeValues,
			ReturnValues: 'ALL_NEW'
		});
		
		const result = await docClient.send(command);
		return { success: true, data: result.Attributes };
	} catch (error) {
		console.error('Error updating item:', error);
		return { success: false, error: error.message };
	}
}

/**
 * Delete an item from DynamoDB table
 * @param {string} tableName - Name of the DynamoDB table
 * @param {Object} key - Primary key of the item to delete
 * @returns {Promise<Object>} - Result of the delete operation
 */
export async function deleteItem(tableName, key) {
	try {
		const command = new DeleteCommand({
			TableName: tableName,
			Key: key
		});
		
		const result = await docClient.send(command);
		return { success: true, data: result };
	} catch (error) {
		console.error('Error deleting item:', error);
		return { success: false, error: error.message };
	}
}

/**
 * Scan all items from DynamoDB table
 * @param {string} tableName - Name of the DynamoDB table
 * @param {Object} filterExpression - Optional filter expression
 * @param {Object} expressionAttributeValues - Values for the filter expression
 * @returns {Promise<Object>} - Result containing all items
 */
export async function scanItems(tableName, filterExpression = null, expressionAttributeValues = null) {
	try {
		const params = {
			TableName: tableName
		};
		
		if (filterExpression) {
			params.FilterExpression = filterExpression;
		}
		
		if (expressionAttributeValues) {
			params.ExpressionAttributeValues = expressionAttributeValues;
		}
		
		const command = new ScanCommand(params);
		const result = await docClient.send(command);
		
		return { success: true, data: result.Items };
	} catch (error) {
		console.error('Error scanning items:', error);
		return { success: false, error: error.message };
	}
}

/**
 * Query items from DynamoDB table using partition key
 * @param {string} tableName - Name of the DynamoDB table
 * @param {string} keyConditionExpression - Key condition expression
 * @param {Object} expressionAttributeValues - Values for the key condition
 * @returns {Promise<Object>} - Result containing queried items
 */
export async function queryItems(tableName, keyConditionExpression, expressionAttributeValues) {
	try {
		const command = new QueryCommand({
			TableName: tableName,
			KeyConditionExpression: keyConditionExpression,
			ExpressionAttributeValues: expressionAttributeValues
		});
		
		const result = await docClient.send(command);
		return { success: true, data: result.Items };
	} catch (error) {
		console.error('Error querying items:', error);
		return { success: false, error: error.message };
	}
}
