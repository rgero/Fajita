import { SocketContext, SocketContextType, useSocketProvider } from '@context/websocket/WebsocketContext';
import { describe, expect, it, vi } from 'vitest';

import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';

describe('useSocketProvider Hook', () => {
  it('should throw error when used outside of SocketProvider', () => {
    // Suppress expected console error
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => renderHook(() => useSocketProvider())).toThrow(
      'useSocketProvider must be used within a SocketProvider'
    );
  });

  it('should return context when used within Provider', () => {
    const mockSocket = { id: '123' } as any;
    const mockValue: SocketContextType = {
      socket: mockSocket,
      jumpQueue: vi.fn(),
      playPause: vi.fn(),
      skipVideo: vi.fn(),
      toggleLock: vi.fn(),
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <SocketContext.Provider value={mockValue}>
        {children}
      </SocketContext.Provider>
    );

    const { result } = renderHook(() => useSocketProvider(), { wrapper });
    expect(result.current.socket?.id).toBe('123');
  });
});