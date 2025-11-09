import { describe, expect, it } from "vitest";

import { getParsedDuration } from "@utils/getParsedDuration"; // adjust path as needed

describe("getParsedDuration", () => {
  it("returns string input unchanged", () => {
    expect(getParsedDuration("3:45")).toBe("3:45");
    expect(getParsedDuration("01:23")).toBe("01:23");
  });

  it("formats number input as minutes:seconds", () => {
    expect(getParsedDuration(0)).toBe("0:00");
    expect(getParsedDuration(59)).toBe("0:59");
    expect(getParsedDuration(60)).toBe("1:00");
    expect(getParsedDuration(125)).toBe("2:05");
    expect(getParsedDuration(600)).toBe("10:00");
  });

  it("pads seconds with leading zeros", () => {
    expect(getParsedDuration(61)).toBe("1:01");
    expect(getParsedDuration(602)).toBe("10:02");
  });
});
