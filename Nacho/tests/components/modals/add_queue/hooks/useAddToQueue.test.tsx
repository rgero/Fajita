import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PlayNextCondition } from "@components/modals/interfaces/PlayNextCondition";
import { Priority } from "@interfaces/Priority";
import { Visibility } from "@interfaces/Visibility";
import toast from "react-hot-toast";
import useAddToQueue from "@components/modals/add_modals/hooks/useAddToQueue";
import { useModalContext } from "@context/modal/ModalContext";
import { useQueueContext } from "@context/queue/QueueContext";
import { useSearchContext } from "@context/search/SearchContext";

// --- MOCK CONTEXTS ---
vi.mock("@context/queue/QueueContext", () => ({
  useQueueContext: vi.fn()
}));

vi.mock("@context/modal/ModalContext", () => ({
  useModalContext: vi.fn()
}));

vi.mock("@context/search/SearchContext", () => ({
  useSearchContext: vi.fn()
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
const mockToggleModal = vi.fn();
const mockSetSelectedResult = vi.fn();

const baseSelectedResult = {
  id: "video123"
};

// mock context implementations




describe("useAddToQueue", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useQueueContext as any).mockReturnValue({
      addVideoToQueue: mockAddVideoToQueue,
      checkForPlayNext: mockCheckForPlayNext,
    });

    (useModalContext as any).mockReturnValue({
      toggleAddToQueueModalOpen: mockToggleModal,
    });

    (useSearchContext as any).mockReturnValue({
      selectedResult: baseSelectedResult,
      setSelectedResult: mockSetSelectedResult,
    });
  });

  // -------------------------------
  //          BASIC STATE
  // -------------------------------
  it("initializes with default values", () => {
    const { result } = renderHook(() => useAddToQueue());

    expect(result.current.priority).toBe(Priority.normal);
    expect(result.current.visibility).toBe(Visibility.Normal);
    expect(result.current.playNextCondition).toBe(PlayNextCondition.None);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.targetID).toBe("video123");
  });

  // -------------------------------
  //          TOGGLE PRIORITY
  // -------------------------------
  it("toggles playNext priority", () => {
    const { result } = renderHook(() => useAddToQueue());

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

    const { result } = renderHook(() => useAddToQueue());

    await act(async () => {
      await result.current.submit();
    });

    expect(mockAddVideoToQueue).toHaveBeenCalledWith({
      id: "video123",
      priority: Priority.normal,
      visibility: Visibility.Normal,
    });
  });

  // -------------------------------
  //     SUBMIT - PERMISSION REQUIRED
  // -------------------------------
  it("requests play-next permission when needed", async () => {
    mockCheckForPlayNext.mockResolvedValue(true);

    const { result } = renderHook(() => useAddToQueue());

    // First toggle to set priority from normal → playNext
    act(() => result.current.togglePlayNext());
    expect(result.current.priority).toBe(Priority.playNext);

    await act(async () => {
      await result.current.submit(); // no accepted condition yet
    });

    // It should have STOPPED here and NOT called addVideoToQueue
    expect(mockAddVideoToQueue).not.toHaveBeenCalled();

    // Should now require user confirmation
    expect(result.current.playNextCondition).toBe(PlayNextCondition.Need);
  });

  // -------------------------------
  //     SUBMIT AFTER CONFIRMATION
  // -------------------------------
  it("submits with priority.playNext after confirming permission", async () => {
    mockCheckForPlayNext.mockResolvedValue(false);

    const { result } = renderHook(() => useAddToQueue());

    // user toggles to playNext priority
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

  // -------------------------------
  //     ERROR DURING SUBMIT
  // -------------------------------
  it("handles submit errors gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockCheckForPlayNext.mockResolvedValue(false);
    mockAddVideoToQueue.mockRejectedValue(new Error("Queue Error"));

    const { result } = renderHook(() => useAddToQueue());

    await act(async () => {
      await result.current.submit();
    });

    expect(toast.error).toHaveBeenCalledWith("Queue Error");

    consoleSpy.mockRestore();
  });


  // -------------------------------
  //     CLEANUP LOGIC
  // -------------------------------
  it("cleans up state and closes modal", () => {
    const { result } = renderHook(() => useAddToQueue());

    // Change state from default so cleanup resets it
    act(() => result.current.togglePlayNext());
    act(() => result.current.setVisibility(Visibility.Hidden));
    act(() => result.current.setPriority(Priority.impatient));

    act(() => result.current.cleanUpAndClose());

    expect(result.current.priority).toBe(Priority.normal);
    expect(result.current.visibility).toBe(Visibility.Normal);
    expect(result.current.playNextCondition).toBe(PlayNextCondition.None);
    expect(result.current.isSubmitting).toBe(false);

    expect(mockToggleModal).toHaveBeenCalled();
    expect(mockSetSelectedResult).toHaveBeenCalledWith(null);
  });
});
