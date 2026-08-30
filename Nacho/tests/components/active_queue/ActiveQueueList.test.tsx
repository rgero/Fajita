import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ActiveQueueList from "@components/active_queues/ActiveQueueList";
import { useActiveQueues } from "@components/active_queues/hooks/useActiveQueues";

// Mock child components
vi.mock("@components/active_queues/ActiveQueueListItem", () => ({
  __esModule: true,
  default: ({ owner, id }: any) => (
    <div data-testid="queue-item">{owner}-{id}</div>
  ),
}));

vi.mock("@components/ui/Spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="spinner" />,
}));

vi.mock("@components/ui/Empty", () => ({
  __esModule: true,
  default: ({ resource }: any) => (
    <div data-testid="empty">{resource}</div>
  ),
}));

// Mock hook
vi.mock("@components/active_queues/hooks/useActiveQueues");

describe("ActiveQueueList", () => {
  const closeFn = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Spinner during loading", () => {
    vi.mocked(useActiveQueues).mockReturnValue({
      isLoading: true,
      queues: [],
      fetchStatus: ""
    });

    render(<ActiveQueueList closeFn={closeFn} />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders the compact empty state when queues is empty", () => {
    vi.mocked(useActiveQueues).mockReturnValue({
      isLoading: false,
      queues: [],
      fetchStatus: ""
    });

    render(<ActiveQueueList closeFn={closeFn} />);
    expect(screen.getByTestId("empty")).toHaveTextContent("No active queues");
    expect(screen.getByTestId("empty")).toHaveTextContent("Check back later.");
  });

  it("renders the compact empty state when queues is undefined", () => {
    vi.mocked(useActiveQueues).mockReturnValue({
      isLoading: false,
      queues: undefined,
      fetchStatus: ""
    });

    render(<ActiveQueueList closeFn={closeFn} />);
    expect(screen.getByTestId("empty")).toHaveTextContent("No active queues");
    expect(screen.getByTestId("empty")).toHaveTextContent("Check back later.");
  });

  it("renders queue items when queues exist", () => {
    vi.mocked(useActiveQueues).mockReturnValue({
      isLoading: false,
      queues: [
        { id: "1", owner: { first_name: "Roy", picture: "p1" }, locked: false } as any,
        { id: "2", owner: { first_name: "Anna", picture: "p2" }, locked: false } as any,
      ],
      fetchStatus: ""
    });

    render(<ActiveQueueList closeFn={closeFn} />);

    const items = screen.getAllByTestId("queue-item");

    expect(items.length).toBe(2);
    expect(items[0]).toHaveTextContent("Anna-2");
    expect(items[1]).toHaveTextContent("Roy-1");
  });

  it("sorts open queues before locked queues and alphabetizes within each group", () => {
    vi.mocked(useActiveQueues).mockReturnValue({
      isLoading: false,
      queues: [
        { id: "locked-b", owner: { first_name: "Beta", picture: "b" }, locked: true } as any,
        { id: "open-c", owner: { first_name: "Charlie", picture: "c" }, locked: false } as any,
        { id: "open-a", owner: { first_name: "Alpha", picture: "a" }, locked: false } as any,
        { id: "locked-a", owner: { first_name: "Alpha", picture: "aa" }, locked: true } as any,
      ],
      fetchStatus: ""
    });

    render(<ActiveQueueList closeFn={closeFn} />);

    const items = screen.getAllByTestId("queue-item");
    expect(items.map((item) => item.textContent)).toEqual([
      "Alpha-open-a",
      "Charlie-open-c",
      "Alpha-locked-a",
      "Beta-locked-b",
    ]);
  });
});
