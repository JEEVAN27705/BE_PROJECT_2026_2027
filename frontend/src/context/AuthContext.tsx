import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

interface AuthContextType {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string, userRole: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );

  const [role, setRole] = useState<string | null>(
    localStorage.getItem('user_role')
  );

  const login = (
    accessToken: string,
    userRole: string
  ) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('user_role', userRole);

    setToken(accessToken);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');

    setToken(null);
    setRole(null);
  };

  const isAuthenticated = token !== null;

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}