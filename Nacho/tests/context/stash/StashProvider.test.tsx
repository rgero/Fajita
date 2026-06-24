import * as api from '@services/apiFajita';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Artifact } from '@interfaces/Artifact';
import { StashProvider } from '@context/stash/StashProvider';
import { useStashContext } from '@context/stash/StashContext';

// 1. Mock the API Services
vi.mock('@services/apiFajita', () => ({
  getStashData: vi.fn(),
  addToStash: vi.fn(),
  deleteFromStash: vi.fn(),
  deleteStash: vi.fn(),
}));

// 2. Mock Data Factory
const createMockArtifact = (id: string, title: string, date: string): Artifact => ({
  id: `db-${id}`,
  created_at: date,
  video: {
    video_id: id,
    title: title,
  }
} as unknown as Artifact);

// 3. Test Component to interact with the Context
let capturedStashContext: ReturnType<typeof useStashContext> | null = null;

const TestComponent = () => {
  const context = useStashContext();
  capturedStashContext = context;
  const {
    stashData, isLoading, error, GetFilteredData, sortOption, searchTerm,
    setSearchTerm, setSortOption, addVideoToStash, deleteVideoFromStash, deleteStash, isInStash
  } = context;

  if (isLoading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">{error.message}</div>;

  return (
    <div>
      <div data-testid="count">{stashData?.length || 0}</div>
      <div data-testid="sort-val">{sortOption}</div>
      <div data-testid="search-val">{searchTerm}</div>
      
      <ul data-testid="list">
        {GetFilteredData().map(a => (
          <li key={a.id}>{a.video.title}</li>
        ))}
      </ul>

      <button onClick={() => setSearchTerm('React')}>Search React</button>
      <button onClick={() => setSortOption('title_asc')}>Sort Asc</button>
      <button onClick={() => setSortOption('date_oldest')}>Sort Oldest</button>
      <button onClick={() => setSortOption('title_desc')}>Sort Desc</button>
      <button onClick={() => setSortOption('unknown_sort' as any)}>Sort Unknown</button>
      <button onClick={() => addVideoToStash('new-123')}>Add Video</button>
      <button onClick={() => deleteVideoFromStash('v1')}>Delete V1</button>
      <button onClick={() => deleteStash()}>Clear Stash</button>

      <div data-testid="is-in-stash-v1">{String(isInStash('v1'))}</div>
      <div data-testid="is-in-stash-missing">{String(isInStash('missing'))}</div>
      <div data-testid="is-in-stash-undefined">{String(isInStash(undefined))}</div>
    </div>
  );
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <StashProvider>{children}</StashProvider>
    </QueryClientProvider>
  );
};

describe('StashProvider Integration', () => {
  const mockArtifacts = [
    createMockArtifact('v1', 'Zebra Training', '2023-01-01T10:00:00Z'),
    createMockArtifact('v2', 'Alpha React', '2023-05-01T10:00:00Z'),
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    capturedStashContext = null;
    // Default success mock for data fetching
    vi.mocked(api.getStashData).mockResolvedValue({ artifacts: mockArtifacts });
  });

  it('loads and displays stash data initially', async () => {
    render(<TestComponent />, { wrapper: createWrapper() });
    expect(screen.getByTestId('loading')).toBeDefined();
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('2'));
  });

  it('filters and sorts data correctly', async () => {
    render(<TestComponent />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('2'));

    // Test Search
    act(() => { screen.getByText('Search React').click(); });
    expect(screen.getAllByRole('listitem')).toHaveLength(1);

    // Test Sort (Alpha React should come first in title_asc)
    act(() => { 
        screen.getByText('Search React').click(); // Clear/Reset filter isn't in UI, so just check sorting
        screen.getByText('Sort Asc').click(); 
    });
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0].textContent).toBe('Alpha React');
  });

  it('uses default sorting when sort option is unknown', async () => {
    render(<TestComponent />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('2'));

    act(() => {
      screen.getByText('Sort Unknown').click();
    });

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0].textContent).toBe('Alpha React');
  });

  it('sorts by oldest date when date_oldest is selected', async () => {
    render(<TestComponent />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('2'));

    act(() => {
      screen.getByText('Sort Oldest').click();
    });

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0].textContent).toBe('Zebra Training');
  });

  it('sorts titles descending when title_desc is selected', async () => {
    render(<TestComponent />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('2'));

    act(() => {
      screen.getByText('Sort Desc').click();
    });

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0].textContent).toBe('Zebra Training');
  });

  it('handles addVideoToStash successfully', async () => {
    // FIX: Mocking return as undefined to satisfy Promise<void>
    vi.mocked(api.addToStash).mockResolvedValue(undefined);
    
    render(<TestComponent />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('2'));

    await act(async () => {
      screen.getByText('Add Video').click();
    });

    expect(api.addToStash).toHaveBeenCalledWith('new-123');
    expect(api.getStashData).toHaveBeenCalledTimes(2); // Initial + Invalidation
  });

  it('handles deleteVideoFromStash successfully', async () => {
    vi.mocked(api.deleteFromStash).mockResolvedValue(undefined);
    
    render(<TestComponent />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('2'));

    await act(async () => {
      screen.getByText('Delete V1').click();
    });

    expect(api.deleteFromStash).toHaveBeenCalledWith('db-v1');
  });

  it('throws when deleting a video not found in stash data', async () => {
    render(<TestComponent />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('2'));

    await expect(capturedStashContext!.deleteVideoFromStash('missing-video')).rejects.toThrow(
      'Artifact not found in stash'
    );
  });

  it('handles deleteStash (entire stash) successfully', async () => {
    vi.mocked(api.deleteStash).mockResolvedValue(undefined);
    
    render(<TestComponent />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('2'));

    await act(async () => {
      screen.getByText('Clear Stash').click();
    });

    expect(api.deleteStash).toHaveBeenCalled();
    expect(api.getStashData).toHaveBeenCalledTimes(2);
  });

  it('captures and displays API errors', async () => {
    // Suppress console error for expected failure
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(api.getStashData).mockRejectedValue(new Error('Failed to fetch'));

    render(<TestComponent />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByTestId('error').textContent).toBe('Failed to fetch');
    });
  });

  it('evaluates isInStash helper for hit, miss and undefined input', async () => {
    render(<TestComponent />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('2'));

    expect(screen.getByTestId('is-in-stash-v1').textContent).toBe('true');
    expect(screen.getByTestId('is-in-stash-missing').textContent).toBe('false');
    expect(screen.getByTestId('is-in-stash-undefined').textContent).toBe('false');
  });

  it('returns false from isInStash when artifacts are missing', async () => {
    vi.mocked(api.getStashData).mockResolvedValue({});

    render(<TestComponent />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('0'));

    expect(screen.getByTestId('is-in-stash-v1').textContent).toBe('false');
  });
});