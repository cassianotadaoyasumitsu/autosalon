import React, { createContext, useContext, useState, useEffect } from 'react';

export interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
  sub: string; // Google user ID
}

interface User {
  id: string;
  name: string;
  role: 'OWNER' | 'PROFESSIONAL';
  email: string;
}

interface StoredUser {
  email: string;
  password?: string;
  id: string;
  name: string;
  role: 'OWNER' | 'PROFESSIONAL';
  authProvider: 'email' | 'google';
  googleId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (googleUser: GoogleUser) => Promise<void>;
  logout: () => void;
  loginMock: () => void; // Mantido para compatibilidade
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredUsers = (): StoredUser[] => {
  const stored = localStorage.getItem('ps_users');
  return stored ? JSON.parse(stored) : [];
};

const saveStoredUsers = (users: StoredUser[]): void => {
  localStorage.setItem('ps_users', JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Security: Check sessionStorage on mount to persist session across refreshes
    // Using sessionStorage instead of localStorage is safer for public computers 
    // as it clears when the tab is closed.
    const storedAuth = sessionStorage.getItem('ps_auth_token');
    const storedUserData = sessionStorage.getItem('ps_user_data');
    if (storedAuth && storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setUser(userData);
      } catch (e) {
        // Invalid data, clear it
        sessionStorage.removeItem('ps_auth_token');
        sessionStorage.removeItem('ps_user_data');
      }
    }
  }, []);

  const signup = async (email: string, password: string): Promise<void> => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }

    // Validate password length
    if (password.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }

    const users = getStoredUsers();
    
    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Este email já está cadastrado');
    }

    // Create new user
    const newUser: StoredUser = {
      email,
      password,
      id: Date.now().toString(),
      name: email.split('@')[0], // Use email prefix as default name
      role: 'OWNER',
      authProvider: 'email'
    };

    users.push(newUser);
    saveStoredUsers(users);

    // Generate token and set user
    const mockToken = 'secure_token_' + Math.random().toString(36).substr(2);
    sessionStorage.setItem('ps_auth_token', mockToken);
    const userData: User = {
      id: newUser.id,
      name: newUser.name,
      role: newUser.role,
      email: newUser.email
    };
    sessionStorage.setItem('ps_user_data', JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (email: string, password: string): Promise<void> => {
    const users = getStoredUsers();
    const user = users.find(u => u.email === email && u.password === password && u.authProvider === 'email');
    
    if (!user) {
      throw new Error('Email ou senha incorretos');
    }

    // Generate token and set user
    const mockToken = 'secure_token_' + Math.random().toString(36).substr(2);
    sessionStorage.setItem('ps_auth_token', mockToken);
    const userData: User = {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email
    };
    sessionStorage.setItem('ps_user_data', JSON.stringify(userData));
    setUser(userData);
  };

  const loginWithGoogle = async (googleUser: GoogleUser): Promise<void> => {
    const users = getStoredUsers();
    let user = users.find(u => u.email === googleUser.email);

    if (!user) {
      // Create new user automatically
      const newUser: StoredUser = {
        email: googleUser.email,
        id: Date.now().toString(),
        name: googleUser.name,
        role: 'OWNER',
        authProvider: 'google',
        googleId: googleUser.sub
      };
      users.push(newUser);
      saveStoredUsers(users);
      user = newUser;
    } else if (user.authProvider !== 'google') {
      // User exists but with email/password, update to support Google
      user.authProvider = 'google';
      user.googleId = googleUser.sub;
      if (!user.name || user.name === user.email.split('@')[0]) {
        user.name = googleUser.name;
      }
      saveStoredUsers(users);
    }

    // Generate token and set user
    const mockToken = 'secure_token_' + Math.random().toString(36).substr(2);
    sessionStorage.setItem('ps_auth_token', mockToken);
    const userData: User = {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email
    };
    sessionStorage.setItem('ps_user_data', JSON.stringify(userData));
    setUser(userData);
  };

  const loginMock = () => {
    // Simulate secure login (mantido para compatibilidade)
    const mockToken = 'secure_token_' + Math.random().toString(36).substr(2);
    sessionStorage.setItem('ps_auth_token', mockToken);
    const userData: User = {
      id: '1',
      name: 'Admin User',
      role: 'OWNER',
      email: 'admin@perfectsalon.com'
    };
    sessionStorage.setItem('ps_user_data', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem('ps_auth_token');
    sessionStorage.removeItem('ps_user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      signup, 
      loginWithGoogle, 
      logout,
      loginMock 
    }}>
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