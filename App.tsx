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
    <div className="flex h-screen bg-stone-50 overflow-hidden font-sans text-stone-800">
      <Sidebar onLogout={onLogout} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
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