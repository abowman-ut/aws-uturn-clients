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

# Start development server
npm run dev
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
