import { describe, expect, it, vi } from "vitest";
import { getSecretMessage, potentialMessages } from "@utils/SecretMessageGenerator";

describe("getSecretMessage", () => {
  it("returns a string from potentialMessages", () => {
    const message = getSecretMessage();
    expect(potentialMessages).toContain(message);
  });

  it("returns random messages across multiple calls", () => {
    const messages = new Set(Array.from({ length: 20 }, () => getSecretMessage()));
    // At least one variation should appear after 20 calls
    expect(messages.size).toBeGreaterThan(1);
  });

  it("respects Math.random output", () => {
    // Mock Math.random to force specific behavior
    vi.spyOn(Math, "random").mockReturnValue(0);
    const first = getSecretMessage();

    vi.spyOn(Math, "random").mockReturnValue(0.9999);
    const last = getSecretMessage();

    expect(first).toBe(potentialMessages[0]);
    expect(last).toBe(potentialMessages[potentialMessages.length - 1]);

    vi.restoreAllMocks();
  });
});
