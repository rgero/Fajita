import { StashContext, StashContextType, useStashContext } from '@context/stash/StashContext'; // update path
import { describe, expect, it, vi } from 'vitest';

import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';

describe('useStashContext', () => {
  it('should throw an error when used outside of StashProvider', () => {
    // We suppress console.error for this test because the error is expected
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useStashContext())).toThrow(
      "useStashContext must be used within a StashProvider"
    );

    consoleSpy.mockRestore();
  });

  it('should return context value when used within StashProvider', () => {
    // Mocking the context values
    const mockContextValue: Partial<StashContextType> = {
      searchTerm: 'test-video',
      stashData: [],
      isLoading: false,
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <StashContext.Provider value={mockContextValue as StashContextType}>
        {children}
      </StashContext.Provider>
    );

    const { result } = renderHook(() => useStashContext(), { wrapper });

    expect(result.current.searchTerm).toBe('test-video');
    expect(result.current.isLoading).toBe(false);
  });
});