import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ActiveQueueDialog from "@components/active_queues/ActiveQueueDialog";

// Mock Modal component so we can assert props are passed correctly
vi.mock("@components/modals/Modal", () => ({
  __esModule: true,
  default: ({ open, closeFn, children }: any) => (
    <div data-testid="dialog" data-open={open}>
      <button data-testid="toggle" onClick={closeFn}>toggle</button>
      {children}
    </div>
  ),
}));

// Mock ActiveQueueList
vi.mock("@components/active_queues/ActiveQueueList", () => ({
  __esModule: true,
  default: ({ closeFn }: any) => (
    <div data-testid="active-queue-list">
      <button data-testid="close-btn" onClick={closeFn}>close</button>
    </div>
  ),
}));

// Mock DialogContext
const mockToggle = vi.fn();
let mockOpen = false;

vi.mock("@context/dialog/DialogContext", () => ({
  __esModule: true,
  useDialogContext: () => ({
    activeQueuesOpen: mockOpen,
    toggleActiveQueuesOpen: mockToggle,
  }),
}));

describe("ActiveQueueDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ------------------------
  // RENDER TESTS
  // ------------------------

  it("renders Active Queues title", () => {
    mockOpen = true;

    render(<ActiveQueueDialog />);

    expect(screen.getByText("Active Queues")).toBeInTheDocument();
  });

  it("passes open state into Dialog", () => {
    mockOpen = true;

    render(<ActiveQueueDialog />);

    expect(screen.getByTestId("dialog")).toHaveAttribute("data-open", "true");
  });

  it("renders ActiveQueueList inside dialog", () => {
    mockOpen = true;

    render(<ActiveQueueDialog />);
    expect(screen.getByTestId("active-queue-list")).toBeInTheDocument();
  });

  // ------------------------
  // INTERACTION TESTS
  // ------------------------

  it("calls toggleActiveQueuesOpen when Modal calls closeFn", () => {
    mockOpen = true;

    render(<ActiveQueueDialog />);

    screen.getByTestId("toggle").click();

    expect(mockToggle).toHaveBeenCalled();
  });

  it("passes toggleActiveQueuesOpen as closeFn to ActiveQueueList", () => {
    mockOpen = true;

    render(<ActiveQueueDialog />);

    screen.getByTestId("close-btn").click();

    expect(mockToggle).toHaveBeenCalled();
  });
});
