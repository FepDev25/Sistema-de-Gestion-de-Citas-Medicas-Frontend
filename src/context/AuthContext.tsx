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
      console.log('Token decodificado:', decoded); // Debug
      
      // Intentar extraer el rol del token
      let rol = 'UNKNOWN';
      
      if (decoded.role) {
        rol = decoded.role;
      } else if (decoded.authorities && Array.isArray(decoded.authorities)) {
        if (typeof decoded.authorities[0] === 'string') {
          rol = decoded.authorities[0];
        } else if (decoded.authorities[0]?.authority) {
          rol = decoded.authorities[0].authority;
        }
      } else if (decoded.roles && Array.isArray(decoded.roles)) {
        rol = decoded.roles[0];
      }
      
      // Si no se encuentra en el token, intentar desde localStorage (workaround temporal)
      if (rol === 'UNKNOWN') {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) {
          rol = storedRole;
        }
      }
      
      // Limpiar el prefijo ROLE_ si existe
      rol = rol.replace('ROLE_', '');
      
      return {
        username: decoded.sub,
        rol: rol
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
    localStorage.removeItem('userRole');
    setToken(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
