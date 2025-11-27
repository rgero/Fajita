import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCreateFeedback } from '@components/feedback/hooks/useCreateFeedback';

// --- Mock react-hot-toast directly in the factory ---
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// --- Mock apiGithubLogger ---
vi.mock('@services/apiGithubLogger', () => ({
  submitFeedback: vi.fn(),
}));

describe('useCreateFeedback', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('calls submitFeedback and shows success toast on success', async () => {
    const { submitFeedback } = await import('@services/apiGithubLogger');
    const toast = (await import('react-hot-toast')).default;

    (submitFeedback as any).mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useCreateFeedback(), { wrapper });

    act(() => {
      result.current.addFeedback({
        user: 'Alice',
        title: 'Test Feedback',
        description: 'This is a test',
      });
    });

    await waitFor(() => {
      expect(submitFeedback).toHaveBeenCalledWith({
        user: 'Alice',
        title: 'Test Feedback',
        description: 'This is a test',
      });
      expect(toast.success).toHaveBeenCalledWith('Feedback Submitted');
    });
  });

  it('shows error toast when submitFeedback rejects', async () => {
    const { submitFeedback } = await import('@services/apiGithubLogger');
    const toast = (await import('react-hot-toast')).default;

    (submitFeedback as any).mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useCreateFeedback(), { wrapper });

    act(() => {
      result.current.addFeedback({
        user: 'Alice',
        title: 'Fail Feedback',
        description: 'This should fail',
      });
    });

    await waitFor(() => {
      expect(submitFeedback).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Network Error');
    });
  });
});
