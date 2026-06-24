import * as api from '@services/apiFajita';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { QueueProvider } from '@context/queue/QueueProvider';
import { useAuth } from '@context/authentication/AuthenticationContext';
import { useLocalStorageState } from '@hooks/useLocalStorageState';
import { useQueueContext } from '@context/queue/QueueContext';
import { Visibility } from '@interfaces/Visibility';

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

let capturedContext: ReturnType<typeof useQueueContext> | null = null;

const CaptureConsumer = () => {
  capturedContext = useQueueContext();
  return null;
};

describe('QueueProvider', () => {
  const mockSetQueue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    capturedContext = null;
    
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

  it('connectToQueue stores the selected queue when it exists', async () => {
    vi.mocked(api.getActiveQueues).mockResolvedValue([
      { id: 'q-1', owner: { first_name: 'A' } },
      { id: 'q-2', owner: { first_name: 'B' } },
    ]);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(capturedContext).not.toBeNull();
    });

    await capturedContext!.connectToQueue('q-2');

    expect(mockSetQueue).toHaveBeenCalledWith(JSON.stringify({ id: 'q-2', owner: { first_name: 'B' } }));
  });

  it('connectToQueue throws when target queue is missing', async () => {
    vi.mocked(api.getActiveQueues).mockResolvedValue([{ id: 'q-1' }]);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(capturedContext).not.toBeNull();
    });

    await expect(capturedContext!.connectToQueue('missing')).rejects.toThrow('Error connecting to queue');
  });

  it('returns empty queue metadata when stored queue is invalid JSON', async () => {
    vi.mocked(useLocalStorageState).mockReturnValue(['not-json', mockSetQueue]);
    vi.mocked(api.getActiveQueues).mockResolvedValue([]);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(capturedContext).not.toBeNull();
      expect(capturedContext!.getQueueID()).toBe('');
      expect(capturedContext!.getQueueOwner()).toBe('');
    });
  });

  it('evaluates queue helper methods from queue data', async () => {
    const stored = JSON.stringify({ id: 'q-1', owner: { first_name: 'Nacho' } });
    vi.mocked(useLocalStorageState).mockReturnValue([stored, mockSetQueue]);
    vi.mocked(api.getActiveQueues).mockResolvedValue([{ id: 'q-1', owner: { first_name: 'Nacho' } }]);
    vi.mocked(api.getQueue).mockResolvedValue({
      id: 'q-1',
      current_interaction: { youtube_id: 'vid-2' },
      next_interaction: { priority: 2 },
      interactions: [
        { id: 'i1', youtube_id: 'vid-1' },
        { id: 'i2', youtube_id: 'vid-2' },
      ],
    } as any);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(capturedContext).not.toBeNull();
      expect(capturedContext!.getQueueID()).toBe('q-1');
      expect(capturedContext!.getQueueOwner()).toBe('Nacho');
      expect(capturedContext!.checkForPlayNext()).toBe(true);
      expect(capturedContext!.isInQueue('vid-1')).toBe(true);
      expect(capturedContext!.isInQueue('vid-404')).toBe(false);
      expect(capturedContext!.getCurrentVideoIndex()).toBe(1);
      expect(capturedContext!.getVideoIndexInQueue('vid-1')).toBe(0);
      expect(capturedContext!.getVideoIndexInQueue('vid-404')).toBe(-1);
    });
  });

  it('returns -1 from getCurrentVideoIndex when queue data is incomplete', async () => {
    const stored = JSON.stringify({ id: 'q-1' });
    vi.mocked(useLocalStorageState).mockReturnValue([stored, mockSetQueue]);
    vi.mocked(api.getActiveQueues).mockResolvedValue([{ id: 'q-1' }]);
    vi.mocked(api.getQueue).mockResolvedValue({ id: 'q-1', interactions: [] });

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(capturedContext).not.toBeNull();
      expect(capturedContext!.getCurrentVideoIndex()).toBe(-1);
    });
  });

  it('addVideoToQueue throws when authenticated user is missing', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: true,
    } as any);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(capturedContext).not.toBeNull();
    });

    await expect(
      capturedContext!.addVideoToQueue({ id: 'video-id', priority: 'single', visibility: 1 } as any)
    ).rejects.toThrow('User not found');
  });

  it('addRandomVideo sends Visibility.Random and invalidates queue query', async () => {
    const queryClient = createTestQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const stored = JSON.stringify({ id: 'q-1' });
    vi.mocked(useLocalStorageState).mockReturnValue([stored, mockSetQueue]);
    vi.mocked(api.getActiveQueues).mockResolvedValue([{ id: 'q-1' }]);

    render(
      <QueryClientProvider client={queryClient}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(capturedContext).not.toBeNull();
    });

    await capturedContext!.addRandomVideo('video-random', 2);

    expect(api.addToQueue).toHaveBeenCalledWith('q-1', 'user-1', 'video-random', 2, Visibility.Random);
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['queueList'] });
  });

  it('addRandomVideo throws when authenticated user is missing', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: true,
    } as any);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(capturedContext).not.toBeNull();
    });

    await expect(capturedContext!.addRandomVideo('video-id', 1)).rejects.toThrow('User not found');
  });

  it('deleteVideoFromQueue invalidates queue query on success', async () => {
    const queryClient = createTestQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    vi.mocked(api.deleteFromQueue).mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(capturedContext).not.toBeNull();
    });

    await capturedContext!.deleteVideoFromQueue('interaction-1');

    expect(api.deleteFromQueue).toHaveBeenCalledWith('interaction-1');
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['queueList'] });
  });

  it('logs queue sync errors from getActiveQueues and continues initialization', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(api.getActiveQueues).mockRejectedValue(new Error('sync failed'));

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Queue Sync Error:', expect.any(Error));
      expect(capturedContext).not.toBeNull();
      expect(capturedContext!.isLoading).toBe(false);
    });

    consoleSpy.mockRestore();
  });

  it('maps 403 queue fetch errors to access-forbidden message', async () => {
    const stored = JSON.stringify({ id: 'q-1' });
    vi.mocked(useLocalStorageState).mockReturnValue([stored, mockSetQueue]);
    vi.mocked(api.getActiveQueues).mockResolvedValue([{ id: 'q-1' }]);
    vi.mocked(api.getQueue).mockRejectedValue({ response: { status: 403 } });

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(capturedContext).not.toBeNull();
      expect(capturedContext!.error?.message).toBe('Access forbidden: You do not have permission to access this queue.');
    });
  });

  it('surfaces non-403 queue fetch errors unchanged', async () => {
    const stored = JSON.stringify({ id: 'q-1' });
    vi.mocked(useLocalStorageState).mockReturnValue([stored, mockSetQueue]);
    vi.mocked(api.getActiveQueues).mockResolvedValue([{ id: 'q-1' }]);
    vi.mocked(api.getQueue).mockRejectedValue(new Error('queue boom'));

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(capturedContext).not.toBeNull();
      expect(capturedContext!.error?.message).toBe('queue boom');
    });
  });

  it('addVideoToQueue invalidates queue query on success', async () => {
    const queryClient = createTestQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const stored = JSON.stringify({ id: 'q-1' });
    vi.mocked(useLocalStorageState).mockReturnValue([stored, mockSetQueue]);
    vi.mocked(api.getActiveQueues).mockResolvedValue([{ id: 'q-1' }]);
    vi.mocked(api.addToQueue).mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <QueueProvider>
          <CaptureConsumer />
        </QueueProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(capturedContext).not.toBeNull();
    });

    await capturedContext!.addVideoToQueue({ id: 'video-abc', priority: 'single', visibility: 1 } as any);

    expect(api.addToQueue).toHaveBeenCalledWith('q-1', 'user-1', 'video-abc', 'single', 1);
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['queueList'] });
  });
});