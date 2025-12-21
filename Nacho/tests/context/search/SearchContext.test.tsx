import { SearchContext, SearchContextType, useSearchContext } from '@context/search/SearchContext';
import { describe, expect, it, vi } from 'vitest';

import React from 'react';
import { renderHook } from '@testing-library/react';

describe('useSearchContext', () => {
  it('should throw an error when used outside of a SearchProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useSearchContext())).toThrow(
      'useSearchContext must be used within an SearchProvider'
    );

    consoleSpy.mockRestore();
  });

  it('should return the context value when used within a SearchProvider', () => {
    const mockContextValue: SearchContextType = {
      searchResults: [
        { id: '1', title: 'Test Video 1' } as any,
        { id: '2', title: 'Test Video 2' } as any
      ],
      selectedResult: null,
      setSelectedResult: vi.fn(),
      isLoading: false,
      error: null,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SearchContext.Provider value={mockContextValue}>
        {children}
      </SearchContext.Provider>
    );

    const { result } = renderHook(() => useSearchContext(), { wrapper });

    expect(result.current.searchResults).toHaveLength(2);
    expect(result.current.isLoading).toBe(false);
    
    // Verify setter function
    const mockResult = { id: '3', title: 'New Selection' } as any;
    result.current.setSelectedResult(mockResult);
    expect(mockContextValue.setSelectedResult).toHaveBeenCalledWith(mockResult);
  });

  it('should reflect changes in context state (like error or loading)', () => {
    const mockError = new Error('Search failed');
    const mockContextValue: SearchContextType = {
      searchResults: [],
      selectedResult: null,
      setSelectedResult: vi.fn(),
      isLoading: true,
      error: mockError,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SearchContext.Provider value={mockContextValue}>
        {children}
      </SearchContext.Provider>
    );

    const { result } = renderHook(() => useSearchContext(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error?.message).toBe('Search failed');
  });
});