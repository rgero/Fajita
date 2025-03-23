import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import SkipOption from '../../../../src/components/footer/DrawerOptions/SkipOption';
import toast from 'react-hot-toast';
import { useQueueProvider } from '../../../../src/context/QueueContext';
import { useSocketProvider } from '../../../../src/context/WebSocketContext';

// Mock the hooks and utilities
vi.mock('../../../../src/context/QueueContext');
vi.mock('../../../../src/context/WebSocketContext');
vi.mock('react-hot-toast');

describe('SkipOption', () => {
  const mockSocket = {
    emit: vi.fn(),
  };

  beforeEach(() => {
    (useQueueProvider as jest.Mock).mockReturnValue({ getQueueID: vi.fn().mockReturnValue('test-queue-id') });
    (useSocketProvider as jest.Mock).mockReturnValue(mockSocket);
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<SkipOption />);
    expect(screen.getByText('Skip video')).toBeInTheDocument();
  });

  it('should handle button click', () => {
    render(<SkipOption />);
    const listItem = screen.getByRole('button');
    fireEvent.click(listItem);
    expect(toast.success).toHaveBeenCalledWith('Skipped!');
    expect(mockSocket.emit).toHaveBeenCalledWith('skipVideo', { queue_id: 'test-queue-id' });
  });
});