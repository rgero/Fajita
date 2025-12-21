import * as api from '@services/apiFajita';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { QueueProvider } from '@context/queue/QueueProvider';
import { useAuth } from '@context/authentication/AuthenticationContext';
import { useLocalStorageState } from '@hooks/useLocalStorageState';
import { useQueueContext } from '@context/queue/QueueContext';

vi.mock('@context/authentication/AuthenticationContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@hooks/useLocalStorageState', () => ({
  useLocalStorageState: vi.fn(),
}));

vi.mock('@services/apiFajita', () => ({
  getActiveQueues: vi.fn(),
  getQueue: vi.fn(),
  addToQueue: vi.fn(),
  deleteFromQueue: vi.fn(),
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false, gcTime: 0 } },
});

const TestConsumer = () => {
  const { isConnected, isLoading, queueData } = useQueueContext();
  if (isLoading) return <div data-testid="status">loading</div>;
  return (
    <div>
      <div data-testid="status">{isConnected ? 'connected' : 'disconnected'}</div>
      <div data-testid="queue-id">{queueData?.id || 'no-id'}</div>
    </div>
  );
};

describe('QueueProvider', () => {
  const mockSetQueue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'user-1' },
      isAuthenticated: true,
    } as any);

    vi.mocked(useLocalStorageState).mockReturnValue(["", mockSetQueue]);
    vi.mocked(api.getActiveQueues).mockResolvedValue([]);
    vi.mocked(api.getQueue).mockResolvedValue({ id: '', interactions: [] });
  });

  it('renders null when not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: false } as any);
    
    const { container } = render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider><span>Content</span></QueueProvider>
      </QueryClientProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('auto-connects if storage is empty and exactly one queue exists', async () => {
    const mockActive = [{ id: 'q-auto', name: 'Only Queue' }];
    vi.mocked(api.getActiveQueues).mockResolvedValue(mockActive);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <TestConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(mockSetQueue).toHaveBeenCalledWith(JSON.stringify(mockActive[0]));
    });
  });

  it('stays connected to the stored queue if it is still in the active list (even if others exist)', async () => {
    const stored = JSON.stringify({ id: 'my-queue' });
    vi.mocked(useLocalStorageState).mockReturnValue([stored, mockSetQueue]);
    
    // API returns multiple queues, including the stored one
    vi.mocked(api.getActiveQueues).mockResolvedValue([
      { id: 'other-queue' },
      { id: 'my-queue' }
    ]);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <TestConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      // It should NOT call setQueue because the current connection is valid
      expect(mockSetQueue).not.toHaveBeenCalled();
    });
  });

  it('clears storage if current queue is gone and NO other queues exist', async () => {
    const stored = JSON.stringify({ id: 'q-dead' });
    vi.mocked(useLocalStorageState).mockReturnValue([stored, mockSetQueue]);
    
    vi.mocked(api.getActiveQueues).mockResolvedValue([]);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <TestConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(mockSetQueue).toHaveBeenCalledWith("");
    });
  });

  it('clears storage if current queue is gone and MULTIPLE other queues exist', async () => {
    const stored = JSON.stringify({ id: 'q-dead' });
    vi.mocked(useLocalStorageState).mockReturnValue([stored, mockSetQueue]);
    
    // Multiple new queues available, but none match the stored one
    vi.mocked(api.getActiveQueues).mockResolvedValue([
      { id: 'new-q-1' },
      { id: 'new-q-2' }
    ]);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <TestConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(mockSetQueue).toHaveBeenCalledWith("");
    });
  });

  it('fetches and displays queue data once initialized', async () => {
    const stored = JSON.stringify({ id: 'q-1' });
    vi.mocked(useLocalStorageState).mockReturnValue([stored, mockSetQueue]);
    vi.mocked(api.getActiveQueues).mockResolvedValue([{ id: 'q-1' }]);
    vi.mocked(api.getQueue).mockResolvedValue({ id: 'q-1', interactions: [] });

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <TestConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('connected');
      expect(screen.getByTestId('queue-id').textContent).toBe('q-1');
    });
  });
});