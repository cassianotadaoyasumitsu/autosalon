# Perfect Salon SaaS

A comprehensive SaaS platform designed for hair salons, featuring WhatsApp scheduling, professional management, service configurations, and customer relationship management tools.

## Overview

Perfect Salon is a modern, full-featured management system that helps salon owners streamline their operations. The platform provides tools for managing professionals, services, appointments, customer reviews, and integrates seamlessly with WhatsApp for convenient client communication.

## Features

- **Dashboard**: Comprehensive overview of salon operations with analytics and insights
- **WhatsApp Integration**: Schedule appointments and communicate with clients via WhatsApp
- **Professional Management**: Manage salon professionals, their schedules, and availability
- **Service Configuration**: Create and manage salon services with pricing and duration
- **Customer Reviews**: Collect and manage customer feedback and ratings
- **Connections**: Manage client relationships and contact information
- **Notifications**: Stay updated with important alerts and reminders
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices

## Tech Stack

- **React 18.2** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library
- **Recharts** - Data visualization and charts
- **Tailwind CSS** - Utility-first CSS framework

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd autosalon
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your `GEMINI_API_KEY` if you plan to use Gemini API features:
```bash
GEMINI_API_KEY=your_api_key_here
```

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

The dev server supports:
- Hot Module Replacement (HMR) for instant updates
- Accessible from network devices (host: 0.0.0.0)

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
autosalon/
├── components/          # Reusable React components
│   └── Sidebar.tsx     # Navigation sidebar component
├── contexts/           # React context providers
│   └── AuthContext.tsx # Authentication context
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── Dashboard.tsx
│   ├── Connections.tsx
│   ├── Professionals.tsx
│   ├── Services.tsx
│   ├── Reviews.tsx
│   ├── Notifications.tsx
│   ├── ProfessionalSetup.tsx
│   ├── FeaturesPage.tsx
│   ├── ManagementPage.tsx
│   ├── PricingPage.tsx
│   ├── PrivacyPage.tsx
│   ├── TermsPage.tsx
│   └── ContactPage.tsx
├── App.tsx             # Main application component with routing
├── index.tsx           # Application entry point
├── types.ts            # TypeScript type definitions
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Authentication

The application includes an authentication system that protects dashboard and management routes. Public routes (landing page, features, pricing) are accessible without authentication, while application routes require login.

## Browser Support

The application supports modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For questions or support, please contact the development team or refer to the contact page within the application.
