import { createContext, useContext } from "react";

import { User } from "../../interfaces/User";

export interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  fetchStatus: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};