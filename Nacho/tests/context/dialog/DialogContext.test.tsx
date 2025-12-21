import { DialogContext, DialogContextType, useDialogContext } from '@context/dialog/DialogContext';
import { describe, expect, it, vi } from 'vitest';

import React from 'react';
import { renderHook } from '@testing-library/react';

describe('useDialogContext', () => {
  it('should throw an error when used outside of a DialogProvider', () => {
    // Suppress console.error to keep the test output clean
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useDialogContext())).toThrow(
      'useDialogContext must be used within an DialogProvider'
    );

    consoleSpy.mockRestore();
  });

  it('should return the context value when used within a Provider', () => {
    const mockContextValue: DialogContextType = {
      queueOpen: true,
      activeQueuesOpen: false,
      feedbackOpen: false,
      stashOpen: true,
      settingsOpen: false,
      areAnyOpen: true,
      toggleQueueOpen: vi.fn(),
      toggleActiveQueuesOpen: vi.fn(),
      toggleFeedbackOpen: vi.fn(),
      toggleStashOpen: vi.fn(),
      toggleSettingsOpen: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DialogContext.Provider value={mockContextValue}>
        {children}
      </DialogContext.Provider>
    );

    const { result } = renderHook(() => useDialogContext(), { wrapper });

    expect(result.current.queueOpen).toBe(true);
    expect(result.current.stashOpen).toBe(true);
    expect(result.current.settingsOpen).toBe(false);
    
    result.current.toggleSettingsOpen();
    expect(mockContextValue.toggleSettingsOpen).toHaveBeenCalledTimes(1);
  });
});