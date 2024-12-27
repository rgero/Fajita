import React, { createContext, useContext } from 'react';

import { User } from '../interfaces/User';
import { getCurrentUser } from '../services/apiAuthentication';
import { useQuery } from '@tanstack/react-query';

interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  fetchStatus: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, fetchStatus, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  const isAuthenticated: boolean = user ? user.id > 0 : false;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, fetchStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};