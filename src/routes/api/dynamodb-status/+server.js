import { json } from '@sveltejs/kit';
import { getConnectionStatus } from '$lib/dynamodb.js';

export async function GET() {
	try {
		const result = await getConnectionStatus();
		return json(result);
	} catch (error) {
		// Handle any unexpected errors gracefully
		return json({
			status: 'error',
			message: 'Unable to connect to DynamoDB',
			region: 'us-east-2',
			timestamp: new Date().toISOString()
		});
	}
}
