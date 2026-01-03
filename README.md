# Perfect Salon SaaS

A comprehensive SaaS platform designed for hair salons, featuring WhatsApp scheduling, professional management, service configurations, and customer relationship management tools.

## Overview

Perfect Salon is a modern, full-featured management system that helps salon owners streamline their operations. The platform provides tools for managing professionals, services, appointments, customer reviews, and integrates seamlessly with WhatsApp for convenient client communication.

## Features

- **Dashboard**: Comprehensive overview of salon operations with analytics and insights
- **Printable Reports**: Generate and print reports for Weekly, Monthly, Quarterly, Semiannual, and Annual periods. Filter by professional or view overall metrics. Includes charts and detailed metrics.
- **Google Calendar Integration**: Full calendar view with create, edit, and delete appointments. Syncs with Google Calendar (mock implementation ready for backend integration)
- **WhatsApp Integration**: Schedule appointments and communicate with clients via WhatsApp
- **Professional Management**: Manage salon professionals, their schedules, and availability
- **Service Configuration**: Create and manage salon services with pricing and duration
- **Customer Reviews**: Collect and manage customer feedback and ratings
- **Connections**: Manage integrations (WhatsApp, Google Calendar) and API keys
- **Notifications**: Stay updated with important alerts and reminders
- **Authentication**: Login and signup with email/password or Google OAuth
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices

## Tech Stack

- **React 18.2** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library
- **Recharts** - Data visualization and charts
- **React Big Calendar** - Calendar component for appointments
- **Moment.js** - Date manipulation and formatting
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
   - Copy `env.example` to `.env.local`
   - Fill in the values as needed:
```bash
cp env.example .env.local
```

   **Frontend Environment Variables:**
   - `VITE_API_BASE_URL` - Backend API URL (when backend is ready)
   - `VITE_GOOGLE_CLIENT_ID` - Google OAuth Client ID (for Google login and Calendar)
   - `VITE_ENVIRONMENT` - Environment (development/staging/production)
   
   **Backend Environment Variables** (when backend is implemented):
   - `GOOGLE_CLIENT_ID` - Google OAuth Client ID
   - `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
   - `GOOGLE_CALENDAR_SCOPES` - Calendar API scopes
   - `GOOGLE_CALENDAR_TIMEZONE` - Default timezone for calendar events
   - `GOOGLE_CALENDAR_ID` - Default calendar ID (usually 'primary')
   
   See `env.example` for frontend variables and `env.backend.example` for backend variables.

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
│   ├── Sidebar.tsx     # Navigation sidebar component
│   ├── ReportModal.tsx # Report generation modal
│   └── ReportView.tsx   # Print-ready report view
├── contexts/           # React context providers
│   └── AuthContext.tsx # Authentication context
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── Dashboard.tsx    # Main dashboard with reports
│   ├── CalendarView.tsx # Google Calendar integration
│   ├── Connections.tsx  # Integration management
│   ├── Professionals.tsx
│   ├── Services.tsx
│   ├── Reviews.tsx
│   ├── Notifications.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── ProfessionalSetup.tsx
│   ├── FeaturesPage.tsx
│   ├── ManagementPage.tsx
│   ├── PricingPage.tsx
│   ├── PrivacyPage.tsx
│   ├── TermsPage.tsx
│   └── ContactPage.tsx
├── public/             # Static assets (served as-is)
│   └── images/         # Image files
├── services/           # API service layers
│   ├── calendarApi.ts  # Google Calendar API service (mock)
│   └── reportService.ts # Report generation service (mock)
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

## Dependencies

### Core Dependencies
- `react` & `react-dom` - React framework
- `react-router-dom` - Client-side routing
- `typescript` - Type safety

### UI & Styling
- `lucide-react` - Icon library
- `tailwindcss` (via CDN) - Utility-first CSS framework
- `recharts` - Data visualization and charts

### Calendar Integration
- `react-big-calendar` - Full-featured calendar component
- `moment` - Date manipulation and formatting

See `package.json` for complete dependency list.

## Authentication

The application includes an authentication system that protects dashboard and management routes. Public routes (landing page, features, pricing) are accessible without authentication, while application routes require login.

**Authentication Methods:**
- Email/Password login and signup
- Google OAuth login (mock implementation)

## Google Calendar Integration

The application includes a full-featured calendar view for managing appointments:

- **View Appointments**: See all appointments in month, week, day, or agenda view
- **Create Appointments**: Click on empty slots or use the "New Appointment" button
- **Edit Appointments**: Click on any event to modify details
- **Delete Appointments**: Remove appointments directly from the calendar
- **Google Calendar Sync**: Connect your Google Calendar to sync appointments (mock implementation, ready for backend integration)

Access the calendar via:
- Sidebar menu → "Calendário"
- Connections page → "Ver Calendário" (when connected)

**Note**: Currently using mock data stored in localStorage. When backend is implemented, appointments will sync with Google Calendar via the Google Calendar API.

## Printable Reports

The Dashboard includes a comprehensive reporting system that allows you to generate and print detailed reports:

- **Report Periods**: Choose from Weekly, Monthly, Quarterly, Semiannual, or Annual periods
- **Professional Filtering**: Generate reports for all professionals or filter by a specific professional
- **Report Contents**:
  - Header with salon name, report period, and generation date
  - Key metrics (Appointments, Estimated Revenue, AI Conversion Rate)
  - Financial Performance chart (revenue trends)
  - Client Volume chart (appointment trends)
  - Status summary
  - Footer with additional information

**How to Generate Reports:**
1. Navigate to the Dashboard
2. Click the "Imprimir Relatório" (Print Report) button in the header
3. Select the desired period (Weekly, Monthly, Quarterly, Semiannual, or Annual)
4. Choose a professional filter ("Todos" for overall or a specific professional)
5. Click "Gerar Relatório" (Generate Report)
6. The report will open in a print-ready view and automatically trigger the browser's print dialog

**Print Features:**
- Optimized A4 format layout
- Print-specific CSS styling
- Charts rendered for printing
- Professional formatting suitable for business documentation
- Can be saved as PDF directly from the browser print dialog

**Note**: Reports currently use mock data. When backend is implemented, reports will pull real-time data from the database.

## Static Assets

Static assets (images, fonts, etc.) should be placed in the `public/` directory. Files in `public/` are served at the root path.

### Using Images

1. Place images in `public/images/`
2. Reference them with absolute paths starting with `/`:

```tsx
// ✅ Correct
<img src="/images/picture.png" alt="Description" />

// ❌ Incorrect
<img src="images/picture.png" alt="Description" />
```

For more details on handling static assets, see `STATIC_ASSETS.md`.

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
