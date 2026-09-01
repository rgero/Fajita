import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ActiveQueueDialog from "@components/active_queues/ActiveQueueDialog";

// Mock Modal component so we can assert props are passed correctly
let capturedModalProps: any = {};
vi.mock("@components/modals/Modal", () => ({
  __esModule: true,
  default: ({ open, closeFn, children, sx }: any) => {
    capturedModalProps = { open, closeFn, children, sx };
    return (
      <div 
        data-testid="dialog" 
        data-open={open}
        data-has-sx-width={!!sx?.width}
        data-has-sx-height={!!sx?.height}
        data-has-sx-display={!!sx?.display}
        data-has-sx-flex-direction={!!sx?.flexDirection}
        data-has-sx-bgcolor={typeof sx?.bgcolor === 'function' || typeof sx?.bgcolor === 'string'}
      >
        <button data-testid="toggle" onClick={closeFn}>toggle</button>
        {children}
      </div>
    );
  },
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

  it("renders Modal with correct sx prop structure", () => {
    mockOpen = true;

    render(<ActiveQueueDialog />);

    const dialog = screen.getByTestId("dialog");
    
    expect(dialog).toHaveAttribute("data-has-sx-width", "true");
    expect(dialog).toHaveAttribute("data-has-sx-height", "true");
    expect(dialog).toHaveAttribute("data-has-sx-display", "true");
    expect(dialog).toHaveAttribute("data-has-sx-flex-direction", "true");
    expect(dialog).toHaveAttribute("data-has-sx-bgcolor", "true");
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

  it("does not render content when dialog is closed", () => {
    mockOpen = false;

    render(<ActiveQueueDialog />);

    expect(screen.getByTestId("dialog")).toHaveAttribute("data-open", "false");
  });

  // Test for theme-dependent bgcolor function
  it("applies theme-aware bgcolor to Modal", () => {
    mockOpen = true;

    render(<ActiveQueueDialog />);

    // Test the bgcolor function with different theme modes
    const sxProp = capturedModalProps.sx;
    if (typeof sxProp?.bgcolor === 'function') {
      const darkTheme = { palette: { mode: 'dark' } };
      const lightTheme = { palette: { mode: 'light' } };

      const darkColor = sxProp.bgcolor(darkTheme);
      const lightColor = sxProp.bgcolor(lightTheme);

      expect(darkColor).toBe("#2f2f2f");
      expect(lightColor).toBe("#f6ead9");
    }
  });
});
