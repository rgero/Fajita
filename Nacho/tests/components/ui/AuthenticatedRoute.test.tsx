import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import AuthenticatedRoute from '@components/ui/AuthenticatedRoute';
import { useAuth } from '@context/authentication/AuthenticationContext';
import { useNavigate } from 'react-router-dom';

vi.mock('@context/authentication/AuthenticationContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@components/ui/Loading', () => ({
  default: vi.fn(() => <div data-testid="loading">Loading...</div>),
}));

describe('AuthenticatedRoute', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
  });

  it('renders Loading when isLoading is true', () => {
    (useAuth as any).mockReturnValue({ isLoading: true, isAuthenticated: false, fetchStatus: '' });

    render(
      <AuthenticatedRoute>
        <div>Protected Content</div>
      </AuthenticatedRoute>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    (useAuth as any).mockReturnValue({ isLoading: false, isAuthenticated: true, fetchStatus: '' });

    render(
      <AuthenticatedRoute>
        <div>Protected Content</div>
      </AuthenticatedRoute>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('navigates to /landing if not authenticated and not loading', () => {
    (useAuth as any).mockReturnValue({ isLoading: false, isAuthenticated: false, fetchStatus: 'idle' });

    render(
      <AuthenticatedRoute>
        <div>Protected Content</div>
      </AuthenticatedRoute>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/landing');
  });

  it('does not navigate while fetching', () => {
    (useAuth as any).mockReturnValue({ isLoading: false, isAuthenticated: false, fetchStatus: 'fetching' });

    render(
      <AuthenticatedRoute>
        <div>Protected Content</div>
      </AuthenticatedRoute>
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
