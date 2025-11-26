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

  it("renders Empty when queues is empty", () => {
    vi.mocked(useActiveQueues).mockReturnValue({
      isLoading: false,
      queues: [],
      fetchStatus: ""
    });

    render(<ActiveQueueList closeFn={closeFn} />);
    expect(screen.getByTestId("empty")).toHaveTextContent("Active Queues");
  });

  it("renders Empty when queues is undefined", () => {
    vi.mocked(useActiveQueues).mockReturnValue({
      isLoading: false,
      queues: undefined,
      fetchStatus: ""
    });

    render(<ActiveQueueList closeFn={closeFn} />);
    expect(screen.getByTestId("empty")).toHaveTextContent("Active Queues");
  });

  it("renders queue items when queues exist", () => {
    vi.mocked(useActiveQueues).mockReturnValue({
      isLoading: false,
      queues: [
        { id: "1", owner: { first_name: "Roy", picture: "p1" } } as any,
        { id: "2", owner: { first_name: "Anna", picture: "p2" } } as any ,
      ],
      fetchStatus: ""
    });

    render(<ActiveQueueList closeFn={closeFn} />);

    const items = screen.getAllByTestId("queue-item");

    expect(items.length).toBe(2);
    expect(items[0]).toHaveTextContent("Roy-1");
    expect(items[1]).toHaveTextContent("Anna-2");
  });
});
