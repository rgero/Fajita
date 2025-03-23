import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import PlayOption from '../../../../src/components/footer/DrawerOptions/PlayOption';
import toast from 'react-hot-toast';
import { useQueueProvider } from '../../../../src/context/QueueContext';
import { useSocketProvider } from '../../../../src/context/WebSocketContext';

// Mock the hooks and utilities
vi.mock('../../../../src/context/QueueContext');
vi.mock('../../../../src/context/WebSocketContext');
vi.mock('react-hot-toast');

describe('PlayOption', () => {
  const mockSocket = {
    on: vi.fn(),
    off: vi.fn(),
  };

  beforeEach(() => {
    (useQueueProvider as jest.Mock).mockReturnValue({ getQueueID: vi.fn() });
    (useSocketProvider as jest.Mock).mockReturnValue(mockSocket);
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<PlayOption />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('button should be pause', async () => {
    render(<PlayOption />);
    const message = { player_state_int: 1 };
    const onMessage = mockSocket.on.mock.calls.find(call => call[0] === 'player_status')[1];
    await waitFor(() => onMessage(message));
    expect(screen.getByRole('button')).toHaveTextContent('Pause');
  });

  it('button should be play', async () => {
    render(<PlayOption />);
    const message = { player_state_int: 0 };
    const onMessage = mockSocket.on.mock.calls.find(call => call[0] === 'player_status')[1];
    await waitFor(() => onMessage(message));
    expect(screen.getByRole('button')).toHaveTextContent('Play');
  });

  it('should handle progressChanged socket event', async () => {
    render(<PlayOption />);
    const processIsPlaying = mockSocket.on.mock.calls.find(call => call[0] === 'progressChanged')[1];
    await waitFor(() => processIsPlaying());
    expect(screen.getByRole('button')).toHaveTextContent('Pause');
  });

  it('should handle button click with debounce', async () => {
    render(<PlayOption />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(toast.loading).toHaveBeenCalledWith(`You're going too fast!`);
  });
});