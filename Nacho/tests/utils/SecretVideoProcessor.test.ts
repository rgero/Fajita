import { beforeEach, describe, expect, it, vi } from "vitest";

import GetSecretCover from "@utils/GetSecretCover";
import { ProcessVideo } from "@utils/SecretVideoProcessor";
import { Visibility } from "@interfaces/Visibility";
import { getSecretMessage } from "@utils/SecretMessageGenerator";

vi.mock("@utils/SecretMessageGenerator", () => ({
  getSecretMessage: vi.fn(),
}));

vi.mock("@utils/GetSecretCover", () => ({
  default: vi.fn(), // ✅ wrap the default export in an object
}));

describe("ProcessVideo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns visible when visibility is not Hidden or Random and index > currentIndex", () => {
    const interaction = { visibility: Visibility.Normal, index: 5 } as any;
    const result = ProcessVideo(interaction, 2);

    expect(result.isVisible).toBe(true);
    expect(result.message).toBeNull();
    expect(result.cover).toBeNull();
  });

  it("returns visible when index <= currentIndex even if visibility is Hidden", () => {
    const interaction = { visibility: Visibility.Hidden, index: 1 } as any;
    const result = ProcessVideo(interaction, 2);

    expect(result.isVisible).toBe(true);
    expect(result.message).toBeNull();
    expect(result.cover).toBeNull();
  });

  it("returns hidden when visibility is Hidden and index > currentIndex", () => {
    const interaction = { visibility: Visibility.Hidden, index: 5 } as any;
    (getSecretMessage as any).mockReturnValue("Secret Message");
    (GetSecretCover as any).mockReturnValue("/BlackBox.png");

    const result = ProcessVideo(interaction, 2);

    expect(result.isVisible).toBe(false);
    expect(result.message).toBe("Secret Message");
    expect(result.cover).toBe("/BlackBox.png");

    expect(getSecretMessage).toHaveBeenCalled();
    expect(GetSecretCover).toHaveBeenCalledWith(result);
  });

  it("returns hidden when visibility is Random and index > currentIndex", () => {
    const interaction = { visibility: Visibility.Random, index: 5 } as any;
    (getSecretMessage as any).mockReturnValue("Random Secret");
    (GetSecretCover as any).mockReturnValue("/Daisy.png");

    const result = ProcessVideo(interaction, 2);

    expect(result.isVisible).toBe(false);
    expect(result.message).toBe("Random Secret");
    expect(result.cover).toBe("/Daisy.png");
  });
});
