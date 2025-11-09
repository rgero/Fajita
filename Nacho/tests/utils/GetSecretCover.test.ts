import { describe, expect, it } from "vitest";

import { QueueStatus } from "@interfaces/QueueStatus";
import getQueueStatusImage from "@utils/GetSecretCover"; // adjust path to match your project

describe("getQueueStatusImage", () => {
  it("returns empty string when status.isVisible is true", () => {
    const status: QueueStatus = { isVisible: true, message: "Hidden test", cover: null  };
    expect(getQueueStatusImage(status)).toBe("");
  });

  it("returns /Daisy.png when message includes 'Daisy'", () => {
    const status: QueueStatus = { isVisible: false, message: "Hello Daisy", cover: null  };
    expect(getQueueStatusImage(status)).toBe("/Daisy.png");
  });

  it("returns /BlackBox.png when message does not include 'Daisy'", () => {
    const status: QueueStatus = { isVisible: false, message: "Something else", cover: null };
    expect(getQueueStatusImage(status)).toBe("/BlackBox.png");
  });
});
