import { beforeEach, describe, expect, it } from "vitest";

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

    OpenYouTubeURL("abc123");
    expect(window.location.href).toBe("youtube://abc123");
  });

  it("opens Android YouTube intent URL when on Android", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "android",
      writable: true,
    });

    OpenYouTubeURL("abc123");
    expect(window.location.href).toBe(
      "intent://www.youtube.com/watch?v=abc123#Intent;package=com.google.android.youtube;scheme=https;end"
    );
  });

  it("opens fallback URL for non-mobile platforms", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Windows NT 10.0",
      writable: true,
    });

    OpenYouTubeURL("abc123");
    expect(window.location.href).toBe("https://www.youtube.com/watch?v=abc123");
  });
});
