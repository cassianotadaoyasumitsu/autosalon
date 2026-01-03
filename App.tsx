import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
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
  isLoggedIn: boolean;
  onLogout: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ 
  children, 
  isLoggedIn, 
  onLogout, 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar onLogout={onLogout} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
         {/* Mobile Header */}
         <header className="bg-white border-b border-slate-200 h-16 flex items-center px-4 lg:hidden">
           <button onClick={() => setSidebarOpen(true)} className="text-slate-500 hover:text-slate-700">
             <Menu className="w-6 h-6" />
           </button>
           <span className="ml-4 font-bold text-slate-900">AutoSalon</span>
         </header>

        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <LandingPage onLogin={handleLogin} />
          } 
        />
        
        {/* Professional Invite/Setup Route - Public access with token */}
        <Route path="/setup" element={<ProfessionalSetup />} />

        <Route path="/dashboard" element={
          <ProtectedLayout 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout} 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
          >
            <Dashboard />
          </ProtectedLayout>
        } />
        
        <Route path="/connections" element={
          <ProtectedLayout 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout} 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
          >
            <Connections />
          </ProtectedLayout>
        } />
        
        <Route path="/professionals" element={
          <ProtectedLayout 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout} 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
          >
            <Professionals />
          </ProtectedLayout>
        } />
        
        <Route path="/services" element={
          <ProtectedLayout 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout} 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
          >
            <Services />
          </ProtectedLayout>
        } />

        <Route path="/reviews" element={
          <ProtectedLayout 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout} 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
          >
            <Reviews />
          </ProtectedLayout>
        } />

        <Route path="/notifications" element={
          <ProtectedLayout 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout} 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
          >
            <Notifications />
          </ProtectedLayout>
        } />

        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;