import { AuthContext } from './AuthenticationContext';
import React from 'react';
import { getCurrentUser } from '@services/apiAuthentication';
import { useQuery } from '@tanstack/react-query';

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, fetchStatus, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  const isAuthenticated: boolean = Boolean(user?.id && Number(user.id) > 0);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, fetchStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
