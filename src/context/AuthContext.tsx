import { createContext, useState, useMemo, type ReactNode } from 'react';
import type { User, AuthContextType, DecodedToken } from '../types/auth';
import { jwtDecode } from 'jwt-decode';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const user = useMemo<User | null>(() => {
    if (!token) return null;
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return {
        username: decoded.sub,
        rol: decoded.role || decoded.authorities?.[0]?.authority || 'UNKNOWN'
      };
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
