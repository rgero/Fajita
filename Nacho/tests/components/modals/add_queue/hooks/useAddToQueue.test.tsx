import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PlayNextCondition } from "@components/modals/interfaces/PlayNextCondition";
import { Priority } from "@interfaces/Priority";
import { Visibility } from "@interfaces/Visibility";
import toast from "react-hot-toast";
import useAddToQueue from "@components/modals/add_modals/hooks/useAddToQueue";
import { useQueueContext } from "@context/queue/QueueContext";

// --- MOCK CONTEXTS ---
vi.mock("@context/queue/QueueContext", () => ({
  useQueueContext: vi.fn()
}));

// --- MOCK TOAST ---
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
  success: vi.fn(),
  error: vi.fn(),
}));

const mockAddVideoToQueue = vi.fn();
const mockCheckForPlayNext = vi.fn();
const mockOnClose = vi.fn();

describe("useAddToQueue", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useQueueContext as any).mockReturnValue({
      addVideoToQueue: mockAddVideoToQueue,
      checkForPlayNext: mockCheckForPlayNext,
    });
  });

  // -------------------------------
  //          BASIC STATE
  // -------------------------------
  it("initializes with default values", () => {
    const { result } = renderHook(() => useAddToQueue("video123", mockOnClose));

    expect(result.current.priority).toBe(Priority.normal);
    expect(result.current.visibility).toBe(Visibility.Normal);
    expect(result.current.playNextCondition).toBe(PlayNextCondition.None);
    expect(result.current.isSubmitting).toBe(false);
  });

  // -------------------------------
  //          TOGGLE PRIORITY
  // -------------------------------
  it("toggles playNext priority", () => {
    const { result } = renderHook(() => useAddToQueue("video123", mockOnClose));

    act(() => result.current.togglePlayNext());
    expect(result.current.priority).toBe(Priority.playNext);

    act(() => result.current.togglePlayNext());
    expect(result.current.priority).toBe(Priority.normal);
  });

  // -------------------------------
  //     SUBMIT - NO PERMISSION REQUIRED
  // -------------------------------
  it("submits normally when priority is normal", async () => {
    mockCheckForPlayNext.mockResolvedValue(false);

    const { result } = renderHook(() => useAddToQueue("video123", mockOnClose));

    await act(async () => {
      await result.current.submit();
    });

    expect(mockAddVideoToQueue).toHaveBeenCalledWith({
      id: "video123",
      priority: Priority.normal,
      visibility: Visibility.Normal,
    });
  });

  it("does nothing when videoId is null", async () => {
    const { result } = renderHook(() => useAddToQueue(null, mockOnClose));

    await act(async () => {
      await result.current.submit();
    });

    expect(mockAddVideoToQueue).not.toHaveBeenCalled();
    expect(mockCheckForPlayNext).not.toHaveBeenCalled();
  });

  it("submits with the provided videoId", async () => {
    mockCheckForPlayNext.mockResolvedValue(false);

    const { result } = renderHook(() => useAddToQueue("nested-video-id", mockOnClose));

    await act(async () => {
      await result.current.submit();
    });

    expect(mockAddVideoToQueue).toHaveBeenCalledWith({
      id: "nested-video-id",
      priority: Priority.normal,
      visibility: Visibility.Normal,
    });
  });

  // -------------------------------
  //     SUBMIT - PERMISSION REQUIRED
  // -------------------------------
  it("requests play-next permission when needed", async () => {
    mockCheckForPlayNext.mockResolvedValue(true);

    const { result } = renderHook(() => useAddToQueue("video123", mockOnClose));

    act(() => result.current.togglePlayNext());
    expect(result.current.priority).toBe(Priority.playNext);

    await act(async () => {
      await result.current.submit();
    });

    expect(mockAddVideoToQueue).not.toHaveBeenCalled();
    expect(result.current.playNextCondition).toBe(PlayNextCondition.Need);
  });

  it("shows error toast when permission check throws", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockCheckForPlayNext.mockRejectedValue(new Error("permission-fail"));

    const { result } = renderHook(() => useAddToQueue("video123", mockOnClose));
    act(() => result.current.togglePlayNext());

    await act(async () => {
      await result.current.submit();
    });

    expect(toast.error).toHaveBeenCalledWith("Error checking play-next permissions");
    expect(mockAddVideoToQueue).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  // -------------------------------
  //     SUBMIT AFTER CONFIRMATION
  // -------------------------------
  it("submits with priority.playNext after confirming permission", async () => {
    mockCheckForPlayNext.mockResolvedValue(false);

    const { result } = renderHook(() => useAddToQueue("video123", mockOnClose));

    act(() => result.current.togglePlayNext());

    await act(async () => {
      await result.current.submit(PlayNextCondition.Accepted);
    });

    expect(mockAddVideoToQueue).toHaveBeenCalledWith({
      id: "video123",
      priority: Priority.playNext,
      visibility: Visibility.Normal,
    });
  });

  it("submits with Priority.normal when play-next is rejected", async () => {
    mockCheckForPlayNext.mockResolvedValue(false);

    const { result } = renderHook(() => useAddToQueue("video123", mockOnClose));
    act(() => result.current.togglePlayNext());

    await act(async () => {
      await result.current.submit(PlayNextCondition.Rejected);
    });

    expect(mockAddVideoToQueue).toHaveBeenCalledWith({
      id: "video123",
      priority: Priority.normal,
      visibility: Visibility.Normal,
    });
  });

  it("submits with Priority.impatient when impatient condition is chosen", async () => {
    mockCheckForPlayNext.mockResolvedValue(false);

    const { result } = renderHook(() => useAddToQueue("video123", mockOnClose));
    act(() => result.current.togglePlayNext());

    await act(async () => {
      await result.current.submit(PlayNextCondition.Impatient);
    });

    expect(mockAddVideoToQueue).toHaveBeenCalledWith({
      id: "video123",
      priority: Priority.impatient,
      visibility: Visibility.Normal,
    });
  });

  // -------------------------------
  //     ERROR DURING SUBMIT
  // -------------------------------
  it("handles submit errors gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockCheckForPlayNext.mockResolvedValue(false);
    mockAddVideoToQueue.mockRejectedValue(new Error("Queue Error"));

    const { result } = renderHook(() => useAddToQueue("video123", mockOnClose));

    await act(async () => {
      await result.current.submit();
    });

    expect(toast.error).toHaveBeenCalledWith("Queue Error");

    consoleSpy.mockRestore();
  });

  it("shows generic toast for non-Error rejection", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockCheckForPlayNext.mockResolvedValue(false);
    mockAddVideoToQueue.mockRejectedValue("boom");

    const { result } = renderHook(() => useAddToQueue("video123", mockOnClose));

    await act(async () => {
      await result.current.submit();
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to add video");
    consoleSpy.mockRestore();
  });

  // -------------------------------
  //     CLEANUP LOGIC
  // -------------------------------
  it("cleans up state and calls onClose", () => {
    const { result } = renderHook(() => useAddToQueue("video123", mockOnClose));

    act(() => result.current.togglePlayNext());
    act(() => result.current.setVisibility(Visibility.Hidden));
    act(() => result.current.setPriority(Priority.impatient));

    act(() => result.current.cleanUpAndClose());

    expect(result.current.priority).toBe(Priority.normal);
    expect(result.current.visibility).toBe(Visibility.Normal);
    expect(result.current.playNextCondition).toBe(PlayNextCondition.None);
    expect(result.current.isSubmitting).toBe(false);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
