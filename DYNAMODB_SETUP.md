# DynamoDB Setup Guide

This guide will help you set up DynamoDB for your AWS U-Turn Clients application.

## Prerequisites

1. AWS Account
2. AWS CLI configured (optional but recommended)
3. DynamoDB table created

## Step 1: Create DynamoDB Table

### Option A: Using AWS Console
1. Go to [AWS DynamoDB Console](https://console.aws.amazon.com/dynamodb/)
2. Click "Create table"
3. Table name: `aws-uturn-clients-table`
4. Partition key: `id` (String)
5. Click "Create table"

### Option B: Using AWS CLI
```bash
aws dynamodb create-table \
    --table-name aws-uturn-clients-table \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
```

## Step 2: Configure Environment Variables

Create a `.env` file in your project root:

```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# DynamoDB Table Name
DYNAMODB_TABLE_NAME=aws-uturn-clients-table
```

## Step 3: Get AWS Credentials

### Option A: IAM User (Recommended for development)
1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Create a new user with programmatic access
3. Attach policy: `AmazonDynamoDBFullAccess`
4. Copy Access Key ID and Secret Access Key

### Option B: AWS CLI Profile
```bash
aws configure
# Enter your credentials when prompted
```

### Option C: Environment Variables
Set these in your deployment environment (AWS Amplify, etc.)

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173
3. Try adding a user using the form
4. Check your DynamoDB table in AWS Console to see the data

## API Endpoints

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

## Troubleshooting

### Common Issues:

1. **Access Denied**: Check your AWS credentials and permissions
2. **Table Not Found**: Verify table name and region
3. **CORS Issues**: Make sure your API routes are properly configured

### Debug Mode:
Add this to your `.env` file to see detailed error messages:
```env
DEBUG=true
```

## Security Notes

- Never commit your `.env` file to version control
- Use IAM roles in production instead of access keys
- Consider using AWS Secrets Manager for sensitive data
- Implement proper input validation and sanitization
