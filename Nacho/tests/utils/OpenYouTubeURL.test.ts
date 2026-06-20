import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import { OpenYouTubeURL } from "@utils/OpenYoutubeURL";

describe("OpenYouTubeURL", () => {
  const originalUserAgent = navigator.userAgent;

  beforeEach(() => {
    // mock window.location
    delete (window as any).location;
    (window as any).location = { href: "" };

    // reset mocks
    Object.defineProperty(navigator, "userAgent", {
      value: originalUserAgent,
      writable: true,
    });
  });

  it("opens iOS YouTube app URL when on iPhone/iPad/iPod", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "iPhone",
      writable: true,
    });

    OpenYouTubeURL("abc123def45");
    expect(window.location.href).toBe("youtube://abc123def45");
  });

  describe("Android", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      Object.defineProperty(navigator, "userAgent", {
        value: "Android",
        writable: true,
      });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("sets the Android intent URL immediately", () => {
      OpenYouTubeURL("abc123def45");
      expect(window.location.href).toBe(
        "intent://www.youtube.com/watch?v=abc123def45#Intent;package=com.google.android.youtube;scheme=https;end"
      );
    });

    it("falls back to the HTTPS URL after 500ms if the app does not open", () => {
      OpenYouTubeURL("abc123def45");
      vi.advanceTimersByTime(500);
      expect(window.location.href).toBe("https://www.youtube.com/watch?v=abc123def45");
    });

    it("cancels the fallback timer when the YouTube app opens (page becomes hidden)", () => {
      OpenYouTubeURL("abc123def45");

      Object.defineProperty(document, "hidden", { value: true, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));

      vi.advanceTimersByTime(500);

      expect(window.location.href).toBe(
        "intent://www.youtube.com/watch?v=abc123def45#Intent;package=com.google.android.youtube;scheme=https;end"
      );

      Object.defineProperty(document, "hidden", { value: false, configurable: true });
    });

    it("does not cancel the fallback timer when a visibility event fires but page is still visible", () => {
      OpenYouTubeURL("abc123def45");

      Object.defineProperty(document, "hidden", { value: false, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));

      vi.advanceTimersByTime(500);

      expect(window.location.href).toBe("https://www.youtube.com/watch?v=abc123def45");
    });
  });

  it("opens fallback URL for non-mobile platforms", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Windows NT 10.0",
      writable: true,
    });

    OpenYouTubeURL("abc123def45");
    expect(window.location.href).toBe("https://www.youtube.com/watch?v=abc123def45");
  });
});
