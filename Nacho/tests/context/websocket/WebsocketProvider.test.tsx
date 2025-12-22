import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import InfoToast from '@components/ui/InfoToast';
import { SocketProvider } from '@context/websocket/WebsocketProvider';
import io from 'socket.io-client';
import { useQueueContext } from '@context/queue/QueueContext';
import { useSocketProvider } from '@context/websocket/WebsocketContext'; // Adjust paths as needed

// 1. Mock External Dependencies
vi.mock('socket.io-client', () => {
  const mSocket = {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
  };
  return {
    default: vi.fn(() => mSocket),
    io: vi.fn(() => mSocket),
  };
});

vi.mock('@context/queue/QueueContext', () => ({
  useQueueContext: vi.fn(),
}));

vi.mock('@components/ui/InfoToast', () => ({
  default: vi.fn(),
}));



// 2. Test Helper Component
const TestConsumer = () => {
  const { playPause, skipVideo, jumpQueue, toggleLock } = useSocketProvider();
  return (
    <div>
      <button onClick={playPause}>Play/Pause</button>
      <button onClick={skipVideo}>Skip</button>
      <button onClick={() => jumpQueue(2)}>Jump 2</button>
      <button onClick={() => toggleLock('testing')}>Toggle Lock</button>
    </div>
  );
};

describe('SocketProvider', () => {
  const mockQueueData = { id: 'queue-123', locked: false };
  const mockRefetch = vi.fn();
  let mockSocket: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup QueueContext mock return
    (useQueueContext as any).mockReturnValue({
      queueData: mockQueueData,
      refetch: mockRefetch,
    });

    // Extract the mock socket instance from the io mock
    mockSocket = (io as any)();
  });

  it('initializes socket when queueData is available', async () => {
    render(
      <SocketProvider>
        <TestConsumer />
      </SocketProvider>
    );

    expect(io).toHaveBeenCalledWith(
      expect.stringContaining('/player'),
      expect.objectContaining({
        query: { queue_id: 'queue-123' }
      })
    );
  });

  it('emits "play_pause" with correct queue_id', async () => {
    render(<SocketProvider><TestConsumer /></SocketProvider>);

    await act(async () => {
      screen.getByText('Play/Pause').click();
    });

    expect(mockSocket.emit).toHaveBeenCalledWith('play_pause', { queue_id: 'queue-123' });
  });

  it('emits "set_index" when jumpQueue is called', async () => {
    render(<SocketProvider><TestConsumer /></SocketProvider>);

    await act(async () => {
      screen.getByText('Jump 2').click();
    });

    expect(mockSocket.emit).toHaveBeenCalledWith('set_index', { 
      queue_id: 'queue-123', 
      index: 2 
    });
  });

  it('emits lock_queue when current state is unlocked', async () => {
    (useQueueContext as any).mockReturnValue({
      queueData: { id: 'queue-123', locked: false },
      refetch: mockRefetch,
    });

    render(<SocketProvider><TestConsumer /></SocketProvider>);

    await act(async () => {
      screen.getByText('Toggle Lock').click();
    });

    expect(mockSocket.emit).toHaveBeenCalledWith('lock_queue', {
      queue_id: 'queue-123',
      reason: 'testing'
    });
  });

  it('emits unlock_queue when current state is locked', async () => {
    // Set mock to locked BEFORE rendering
    (useQueueContext as any).mockReturnValue({
      queueData: { id: 'queue-123', locked: true },
      refetch: mockRefetch,
    });

    render(<SocketProvider><TestConsumer /></SocketProvider>);

    await act(async () => {
      screen.getByText('Toggle Lock').click();
    });

    expect(mockSocket.emit).toHaveBeenCalledWith('unlock_queue', {
      queue_id: 'queue-123',
      reason: 'testing'
    });
  });

  it('handles websocket events and triggers UI/refetch', async () => {
    render(<SocketProvider><TestConsumer /></SocketProvider>);

    // Find the callback registered for "queue_updated"
    const onDataChangeCallback = mockSocket.on.mock.calls.find(
      (call: any) => call[0] === 'queue_updated'
    )[1];

    // Simulate server emitting event
    await act(async () => {
      onDataChangeCallback();
    });

    expect(mockRefetch).toHaveBeenCalled();
  });

  it('shows toast when queue is locked/unlocked via socket', async () => {
    render(<SocketProvider><TestConsumer /></SocketProvider>);

    // Simulate "queue_locked" event from server
    const onLockedCallback = mockSocket.on.mock.calls.find(
      (call: any) => call[0] === 'queue_locked'
    )[1];

    act(() => {
      onLockedCallback();
    });

    expect(InfoToast).toHaveBeenCalledWith("Queue is locked");
  });

  it('cleans up listeners on unmount', () => {
    const { unmount } = render(<SocketProvider><TestConsumer /></SocketProvider>);
    
    unmount();

    expect(mockSocket.off).toHaveBeenCalledWith('queue_updated', expect.any(Function));
    expect(mockSocket.off).toHaveBeenCalledWith('queue_locked', expect.any(Function));
  });
});