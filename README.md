# AWS U-Turn Clients

A clean and simple SvelteKit application with Bootstrap integration, ready for AWS Amplify deployment.

## Features

- ⚡ **SvelteKit** - Modern web framework
- 🎨 **Bootstrap 5.3** - CSS framework and components
- 🎯 **Bootstrap Icons** - Icon library
- 🚀 **AWS Amplify** - Ready for deployment
- 📱 **Responsive** - Mobile-first design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/abowman-ut/aws-uturn-clients.git

# Navigate to project directory
cd aws-uturn-clients

# Install dependencies
npm install

# Set up environment variables
npm run setup:env

# Start development server
npm run dev
```

### Environment Variables

This project uses a simple environment variable management system:

#### Quick Setup
```bash
# Set up local development environment
npm run setup:env:local

# Set up production environment template
npm run setup:env:production
```

#### Environment Files
- `env.example` - Template with all available variables
- `env.local` - Local development configuration
- `env.production` - Production configuration template
- `.env` - Active environment file (created by setup script)

#### Available Variables
```bash
# Database Configuration
DATABASE_URL="file:./dev.db"
DATABASE_TYPE="sqlite"

# Application Configuration
APP_NAME="AWS U-Turn Clients"
APP_ENV="development"
PORT=5173

# API Configuration
API_BASE_URL="http://localhost:5173"

# Security
JWT_SECRET="your-secret-key"
SESSION_SECRET="your-session-secret"

# Logging
LOG_LEVEL="debug"
```

#### Using Environment Variables in Code
```javascript
import { env, isDevelopment, isProduction } from '$lib/env.js';

// Access environment variables
const appName = env.APP_NAME;
const dbUrl = env.DATABASE_URL;

// Environment checks
if (isDevelopment()) {
  console.log('Running in development mode');
}
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project is configured for AWS Amplify deployment:

- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Node Version:** 18+

## Project Structure

```
src/
├── lib/
│   └── assets/
│       └── favicon.svg
├── routes/
│   ├── +layout.svelte
│   └── +page.svelte
└── app.html
```

## Technologies Used

- [SvelteKit](https://kit.svelte.dev/) - Web framework
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Icons
- [Vite](https://vitejs.dev/) - Build tool

## License

Private project - All rights reserved.
