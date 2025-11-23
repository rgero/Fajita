// tests/components/footer/FooterProgressBar.test.tsx

import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import FooterProgressBar from "@components/footer/FooterProgressBar";

const mockSocketOn = vi.fn();
const mockSocketOff = vi.fn();

vi.mock("@context/websocket/WebsocketContext", () => ({
  useSocketProvider: () => ({
    socket: {
      on: mockSocketOn,
      off: mockSocketOff,
    },
  }),
}));

const mockQueueData = {
  id: "queue-123",
  current_interaction: {
    video: {
      duration: 100,
    },
  },
};

vi.mock("@context/queue/QueueContext", () => ({
  useQueueContext: () => ({
    queueData: mockQueueData,
  }),
}));

describe("FooterProgressBar", () => {
  let listener: ((data: any) => void) | undefined;

  beforeEach(() => {
    mockSocketOn.mockClear();
    mockSocketOff.mockClear();
    listener = undefined;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders LinearProgress with initial value 0", () => {
    render(<FooterProgressBar />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute("aria-valuenow", "0");
  });

  it("updates progress when socket emits matching queue_id", async () => {
    mockSocketOn.mockImplementation((_event, cb) => {
      listener = cb;
    });

    render(<FooterProgressBar />);

    await act(async () => {
      listener!({ queue_id: "queue-123", progress: 50 });
    });

    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "50");
  });

  it("does not update progress for a different queue_id", async () => {
    mockSocketOn.mockImplementation((_event, cb) => {
      listener = cb;
    });

    render(<FooterProgressBar />);

    await act(async () => {
      listener!({ queue_id: "other-queue", progress: 80 });
    });

    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "0"); // should stay 0
  });

  it("removes socket listener on unmount", () => {
    mockSocketOn.mockImplementation((_event, cb) => {
      listener = cb;
    });

    const { unmount } = render(<FooterProgressBar />);
    unmount();

    expect(mockSocketOff).toHaveBeenCalledWith("player_progress", listener);
  });

  it("calculates percentage correctly", async () => {
    mockSocketOn.mockImplementation((_event, cb) => {
      listener = cb;
    });

    render(<FooterProgressBar />);

    await act(async () => {
      listener!({ queue_id: "queue-123", progress: 25 }); // 25 / 100 = 25%
    });

    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "25");
  });
});
