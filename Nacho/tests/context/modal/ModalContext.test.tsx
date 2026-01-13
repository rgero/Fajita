import { ModalContext, ModalContextType, useModalContext } from '@context/modal/ModalContext';
import { describe, expect, it, vi } from 'vitest';

import React from 'react';
import { renderHook } from '@testing-library/react';

describe('useModalContext', () => {
  it('should throw an error when used outside of a ModalProvider', () => {
    // Suppress console.error for this test to keep the logs clean
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useModalContext())).toThrow(
      'useModalContext must be used within an ModalProvider'
    );

    consoleSpy.mockRestore();
  });

  it('should return the context value when used within a ModalProvider', () => {
    const mockContextValue: ModalContextType = {
      anyModalsOpen: false,
      clearStashModalOpen: false,
      lockQueueModalOpen: false,
      queueInfoModalOpen: false,
      addRandomModalOpen: false,
      addToQueueModalOpen: false,
      confirmSkipModalOpen: false,
      shareModalOpen: false,
      userModalOpen: false,
      toggleClearStashModalOpen: vi.fn(),
      toggleLockQueueModalOpen: vi.fn(),
      toggleQueueInfoModalOpen: vi.fn(),
      toggleAddRandomModalOpen: vi.fn(),
      toggleAddToQueueModalOpen: vi.fn(),
      toggleConfirmSkipModalOpen: vi.fn(),
      toggleShareModalOpen: vi.fn(),
      toggleUserModalOpen: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ModalContext.Provider value={mockContextValue}>
        {children}
      </ModalContext.Provider>
    );

    const { result } = renderHook(() => useModalContext(), { wrapper });
    expect(result.current.anyModalsOpen).toBe(false);
    
    result.current.toggleShareModalOpen();
    expect(mockContextValue.toggleShareModalOpen).toHaveBeenCalled();
  });
});