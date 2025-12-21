import { QueueContext, QueueContextType, useQueueContext } from '@context/queue/QueueContext'; // Adjust path
import { describe, expect, it, vi } from 'vitest';

import { QueueData } from '@interfaces/QueueData';
import React from 'react';
import { renderHook } from '@testing-library/react';

describe('useQueueContext', () => {
  it('should throw an error when used outside of a QueueProvider', () => {
    // Suppress console.error to keep logs clean
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useQueueContext())).toThrow(
      'useQueueContext must be used within a QueueProvider'
    );

    consoleSpy.mockRestore();
  });

  it('should return the full queue context value when used within a Provider', () => {
    // 1. Mock minimal QueueData
    const mockQueueData = {
      id: 'queue-123',
      videos: [],
      owner: 'user-1'
    } as unknown as QueueData;

    // 2. Create the mock context value
    const mockContextValue: QueueContextType = {
      addVideoToQueue: vi.fn(),
      addRandomVideo: vi.fn(),
      checkForPlayNext: vi.fn(() => true),
      connectToQueue: vi.fn(),
      currentlySelected: null,
      deleteVideoFromQueue: vi.fn(),
      isConnected: true,
      error: null,
      getCurrentVideoIndex: vi.fn(() => 0),
      getQueueID: vi.fn(() => 'queue-123'),
      getQueueOwner: vi.fn(() => 'user-1'),
      getVideoIndexInQueue: vi.fn(() => -1),
      isActionPending: false,
      isInQueue: vi.fn(() => false),
      isLoading: false,
      queueData: mockQueueData,
      refetch: vi.fn(),
      searchTerm: '',
      setCurrentlySelected: vi.fn(),
      setSearchTerm: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueueContext.Provider value={mockContextValue}>
        {children}
      </QueueContext.Provider>
    );

    const { result } = renderHook(() => useQueueContext(), { wrapper });

    // 3. Verify Data
    expect(result.current.isConnected).toBe(true);
    expect(result.current.queueData.id).toBe('queue-123');
    
    // 4. Verify Methods
    result.current.addVideoToQueue({ id: 'vid-1', priority: 1, visibility: 1 });
    expect(mockContextValue.addVideoToQueue).toHaveBeenCalledWith({
      id: 'vid-1',
      priority: 1,
      visibility: 1
    });

    expect(result.current.checkForPlayNext()).toBe(true);
  });
});