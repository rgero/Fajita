import { describe, expect, it, vi } from "vitest";

import getName from "@utils/SecretNameDisplay";

const potentialNames = {
  Vince: ["Mellow Corn"],
  Anna: ["Millie's Mom", "Dr. Sleepy", "Geminni"],
  Grant: ["Boatboy", "Cloud Plumber"],
  Jake: ["ABBA #1 Fan"],
  Sunny: ["The Fairy Goth"],
  Roy: ["Huckleberry Sizzlah"],
  Tina: ["Pickles", "Single Female Lawyer"]
};

describe("getName", () => {
  it("returns the original name when Math.random() is above targetNumber", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    const result = getName("Vince");
    expect(result).toBe("Vince");

    vi.restoreAllMocks();
  });

  it("returns an alias when Math.random() is below threshold and name matches", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.001).mockReturnValueOnce(0.0);
      
    const result = getName("Anna");
    expect(potentialNames.Anna).toContain(result);

    vi.restoreAllMocks();
  });

  it("matches names case-insensitively", () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.001)
      .mockReturnValueOnce(0.0);

    const result = getName("vIn");
    expect(result).toBe("Mellow Corn");

    vi.restoreAllMocks();
  });

  it("returns original name when no match exists", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.001); // trigger alias logic

    const result = getName("Zelda");
    expect(result).toBe("Zelda");

    vi.restoreAllMocks();
  });

  it("randomly selects between multiple aliases", () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.001)  // trigger alias
      .mockReturnValueOnce(0.8);   // pick second alias

    const result = getName("Tina");
    expect(result).toBe("Single Female Lawyer");

    vi.restoreAllMocks();
  });
});
