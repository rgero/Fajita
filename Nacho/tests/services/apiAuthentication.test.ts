import { beforeEach, describe, expect, it, vi } from "vitest";

import { fajitaAxios } from "@services/axios";
import { getCurrentUser } from "@services/apiAuthentication";

vi.mock("@services/axios", () => ({
  fajitaAxios: {
    get: vi.fn(),
  },
}));

describe("authentication API", () => {
  const currentUser = {
    id: "e270ab4f-0666-4957-aaff-6817905b6899",
    email: "test@example.com",
    full_name: "Test User",
    name: "Test",
    picture: "",
    is_host: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("VITE_BACKEND_URL", "https://horchata.test");
  });

  it("loads the authenticated PocketID user from /api/me", async () => {
    vi.mocked(fajitaAxios.get).mockResolvedValue({
      status: 200,
      data: currentUser,
    });

    await expect(getCurrentUser()).resolves.toEqual(currentUser);
    expect(fajitaAxios.get).toHaveBeenCalledWith("https://horchata.test/api/me");
  });

  it("surfaces a missing user response", async () => {
    vi.mocked(fajitaAxios.get).mockResolvedValue({
      status: 200,
      data: undefined,
    });

    await expect(getCurrentUser()).rejects.toThrow("Failed to get current user");
  });

  it("propagates authentication request failures", async () => {
    const failure = new Error("Unauthorized");
    vi.mocked(fajitaAxios.get).mockRejectedValue(failure);

    await expect(getCurrentUser()).rejects.toBe(failure);
  });
});
