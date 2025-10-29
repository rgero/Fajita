import { AuthContext } from './AuthenticationContext';
import React from 'react';
import { getCurrentUser } from '@services/apiAuthentication';
import { useQuery } from '@tanstack/react-query';

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
