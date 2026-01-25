import { createContext, useContext, useEffect, useState } from 'react';
import { authStorage } from './authStorage';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

let globalLogout: (() => void) | null = null;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authStorage.getToken().then(token => {
      setIsLoggedIn(!!token);
      setLoading(false);
    });
  }, []);

  const login = async (token: string) => {
    await authStorage.saveToken(token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await authStorage.clearToken();
    setIsLoggedIn(false);
  };

  globalLogout = () => {
    logout();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const triggerLogout = () => {
  globalLogout?.();
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};
