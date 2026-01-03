import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  role: 'OWNER' | 'PROFESSIONAL';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Security: Check sessionStorage on mount to persist session across refreshes
    // Using sessionStorage instead of localStorage is safer for public computers 
    // as it clears when the tab is closed.
    const storedAuth = sessionStorage.getItem('ps_auth_token');
    if (storedAuth) {
      // In a real app, we would validate this token with the backend
      setUser({ id: '1', name: 'Admin User', role: 'OWNER' });
    }
  }, []);

  const login = () => {
    // Simulate secure login
    const mockToken = 'secure_token_' + Math.random().toString(36).substr(2);
    sessionStorage.setItem('ps_auth_token', mockToken);
    setUser({ id: '1', name: 'Admin User', role: 'OWNER' });
  };

  const logout = () => {
    sessionStorage.removeItem('ps_auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};