import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import FeaturesPage from './pages/FeaturesPage';
import ManagementPage from './pages/ManagementPage';
import PricingPage from './pages/PricingPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Connections from './pages/Connections';
import Professionals from './pages/Professionals';
import Services from './pages/Services';
import Reviews from './pages/Reviews';
import Notifications from './pages/Notifications';
import ProfessionalSetup from './pages/ProfessionalSetup';
import { Menu } from 'lucide-react';

// Define props for ProtectedLayout
interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden font-sans text-stone-800">
      <Sidebar onLogout={logout} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
         {/* Mobile Header */}
         <header className="bg-white border-b border-stone-200 h-16 flex items-center px-6 lg:hidden justify-between">
           <span className="font-serif italic text-xl text-zinc-900">Perfect Salon</span>
           <button onClick={() => setSidebarOpen(true)} className="text-stone-500 hover:text-stone-800 transition-colors">
             <Menu className="w-6 h-6" />
           </button>
         </header>

        <main className="flex-1 overflow-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Wrapper component to handle redirects based on auth state for public pages
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/features" element={<PublicRoute><FeaturesPage /></PublicRoute>} />
      <Route path="/management" element={<PublicRoute><ManagementPage /></PublicRoute>} />
      <Route path="/pricing" element={<PublicRoute><PricingPage /></PublicRoute>} />
      <Route path="/privacy" element={<PublicRoute><PrivacyPage /></PublicRoute>} />
      <Route path="/terms" element={<PublicRoute><TermsPage /></PublicRoute>} />
      <Route path="/contact" element={<PublicRoute><ContactPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
      
      {/* Professional Invite/Setup Route - Public access with token */}
      <Route path="/setup" element={<ProfessionalSetup />} />

      {/* Protected Application Routes */}
      <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
      <Route path="/connections" element={<ProtectedLayout><Connections /></ProtectedLayout>} />
      <Route path="/professionals" element={<ProtectedLayout><Professionals /></ProtectedLayout>} />
      <Route path="/services" element={<ProtectedLayout><Services /></ProtectedLayout>} />
      <Route path="/reviews" element={<ProtectedLayout><Reviews /></ProtectedLayout>} />
      <Route path="/notifications" element={<ProtectedLayout><Notifications /></ProtectedLayout>} />

      {/* Catch all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;