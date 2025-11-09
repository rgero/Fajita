import { beforeEach, describe, expect, it, vi } from "vitest";
import { copyToClipboard, copyVideoIDToClipboard } from "@utils/CopyToClipboard";

import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

vi.mock("copy-to-clipboard", () => ({
  default: vi.fn(),
}));

vi.mock("react-hot-toast", () => {
  const mockToast = {
    success: vi.fn(),
    error: vi.fn(),
    dismiss: vi.fn(),
  };
  return {
    default: mockToast, // default export
    ...mockToast,       // named exports (so `toast.success` and `import { success }`)
  };
});


describe("copyToClipboard utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("copyToClipboard", () => {
    it("shows error toast if interaction is null", () => {
      copyToClipboard(null);

      expect(copy).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Nothing currently playing to copy");
      expect(toast.success).not.toHaveBeenCalled();
    });

    it("copies YouTube link and shows success toast", () => {
      const mockInteraction = {
        video: { video_id: "abc123" },
      };

      copyToClipboard(mockInteraction as any);

      expect(copy).toHaveBeenCalledWith("https://www.youtube.com/watch?v=abc123");
      expect(toast.success).toHaveBeenCalledWith("Copied to clipboard");
    });

    it("works with an Artifact that wraps a video", () => {
      const mockArtifact = {
        video: { video_id: "xyz789" },
        stash: { id: "1", modified_at: new Date() },
      };

      copyToClipboard(mockArtifact as any);

      expect(copy).toHaveBeenCalledWith("https://www.youtube.com/watch?v=xyz789");
      expect(toast.success).toHaveBeenCalledWith("Copied to clipboard");
    });
  });

  describe("copyVideoIDToClipboard", () => {
    it("copies YouTube link and shows success toast", () => {
      copyVideoIDToClipboard("def456");

      expect(copy).toHaveBeenCalledWith("https://www.youtube.com/watch?v=def456");
      expect(toast.success).toHaveBeenCalledWith("Copied to clipboard");
    });
  });
});
