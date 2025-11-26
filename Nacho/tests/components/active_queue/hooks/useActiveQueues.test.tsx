import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useActiveQueues } from "@components/active_queues/hooks/useActiveQueues";

const mockGetActiveQueues = vi.fn();

vi.mock("@services/apiFajita", () => ({
  __esModule: true,
  getActiveQueues: () => mockGetActiveQueues(),
}));


// ------------------------
// Helper to wrap hook in QueryProvider
// ------------------------
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // avoid retries during tests
      },
    },
  });

  return ({ children }: any) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

// ------------------------
// Tests
// ------------------------
describe("useActiveQueues", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns loading state initially", () => {
    mockGetActiveQueues.mockReturnValue(new Promise(() => {})); // never resolves

    const { result } = renderHook(() => useActiveQueues(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.queues).toBeUndefined();
  });

  it("returns queues when API resolves successfully", async () => {
    const fakeQueues = [
      { id: "1", owner: { first_name: "Roy", picture: "a.png" } },
      { id: "2", owner: { first_name: "Anna", picture: "b.png" } },
    ];

    mockGetActiveQueues.mockResolvedValue(fakeQueues);

    const { result } = renderHook(() => useActiveQueues(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.queues).toEqual(fakeQueues);
    expect(result.current.fetchStatus).toBeDefined();
  });

  it("returns undefined queues when request fails", async () => {
    mockGetActiveQueues.mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => useActiveQueues(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.queues).toBeUndefined();
  });
});
