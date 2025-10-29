import { client } from '$lib/dynamodb';
import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export async function load() {
    // First check if environment variables are set
    if (!process.env.MY_AWS_ACCESS_KEY_ID || !process.env.MY_AWS_SECRET_ACCESS_KEY) {
        return {
            dbStatus: {
                status: 'error',
                message: 'AWS credentials are not set. Please set MY_AWS_ACCESS_KEY_ID and MY_AWS_SECRET_ACCESS_KEY environment variables.'
            }
        };
    }

    try {
        // Try to list tables to verify connection
        const response = await client.send(new ListTablesCommand({}));
        
        // Check if our required tables exist
        const requiredTables = import.meta.env.DEV 
            ? ['uturn-clients-local']
            : ['uturn-clients'];
        
        const missingTables = requiredTables.filter(table => !response.TableNames.includes(table));
        
        if (missingTables.length > 0) {
            return {
                dbStatus: {
                    status: 'error',
                    message: `Missing required tables: ${missingTables.join(', ')}. Please create these tables in DynamoDB.`
                }
            };
        }
        
        return {
            dbStatus: {
                status: 'success',
                message: `Successfully connected to DynamoDB. Found ${response.TableNames?.length || 0} tables.`
            }
        };
    } catch (error) {
        console.error('DynamoDB Connection Error:', error);
        return {
            dbStatus: {
                status: 'error',
                message: `Connection failed: ${error.message}. Make sure your AWS credentials and region are correct.`
            }
        };
    }
} 