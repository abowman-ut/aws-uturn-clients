# DynamoDB Setup Instructions

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
DYNAMODB_TABLE_NAME=your_table_name_here
```

## AWS Credentials Setup

1. **Create IAM User:**
   - Go to AWS IAM Console
   - Create a new user with programmatic access
   - Attach policy: `AmazonDynamoDBFullAccess` (or create custom policy)

2. **Get Credentials:**
   - Copy Access Key ID and Secret Access Key
   - Add them to your `.env.local` file

3. **Create DynamoDB Table (Optional):**
   - Go to DynamoDB Console
   - Create a table (any name)
   - Note: The connection test will work even without a table

## Testing Connection

The homepage will automatically test the DynamoDB connection and display:
- ✅ **Connected** - Successfully connected to DynamoDB
- ❌ **Error** - Connection failed (check credentials)
- ⏳ **Loading** - Testing connection...

## Security Notes

- Never commit `.env.local` to version control
- Use IAM roles in production (AWS Amplify handles this automatically)
- Consider using AWS Secrets Manager for production deployments
