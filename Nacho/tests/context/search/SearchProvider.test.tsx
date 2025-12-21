import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { SearchProvider } from '@context/search/SearchProvider';
import { getSearchResults } from '@services/apiFajita';
import { useSearchContext } from '@context/search/SearchContext';

vi.mock('@services/apiFajita', () => ({
  getSearchResults: vi.fn(),
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false, gcTime: 0 } },
});

const TestConsumer = () => {
  const { searchResults, isLoading, selectedResult, setSelectedResult } = useSearchContext();
  
  if (isLoading) return <div data-testid="loading">Loading...</div>;
  
  return (
    <div>
      <div data-testid="count">{searchResults.length}</div>
      <div data-testid="selected">{selectedResult ? 'Selected' : 'None'}</div>
      <button onClick={() => setSelectedResult({ id: '123' } as any)}>Select</button>
    </div>
  );
};

describe('SearchProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not trigger a search if the URL param "search" is missing', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryClientProvider client={createTestQueryClient()}>
          <SearchProvider>
            <TestConsumer />
          </SearchProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(getSearchResults).not.toHaveBeenCalled();
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('triggers a search when the "search" URL param is present', async () => {
    const mockData = [{ id: 'vid1', title: 'Video 1' }];
    vi.mocked(getSearchResults).mockResolvedValue(mockData);

    render(
      <MemoryRouter initialEntries={['/?search=react-testing']}>
        <QueryClientProvider client={createTestQueryClient()}>
          <SearchProvider>
            <TestConsumer />
          </SearchProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getSearchResults).toHaveBeenCalledWith('react-testing');
      expect(screen.getByTestId('count').textContent).toBe('1');
    });
  });

  it('manages selectedResult state correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryClientProvider client={createTestQueryClient()}>
          <SearchProvider>
            <TestConsumer />
          </SearchProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('selected').textContent).toBe('None');
    
    const btn = screen.getByRole('button', { name: /select/i });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(screen.getByTestId('selected').textContent).toBe('Selected');
    });
  });
});