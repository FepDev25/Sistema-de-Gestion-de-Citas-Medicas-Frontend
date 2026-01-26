export interface User {
  username: string;
  rol: string;
}

export interface DecodedToken {
  sub: string;
  role?: string;
  authorities?: { authority: string }[];
  exp: number;
  iat: number;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}
