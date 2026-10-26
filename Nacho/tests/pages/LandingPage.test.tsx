import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import LandingPage from "@pages/LandingPage";

describe("LandingPage", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // Reset window.location before each test
    delete (window as any).location;
    (window as any).location = { href: "" };
  });

  afterEach(() => {
    // Restore original window.location after tests
    // @ts-ignore
    window.location = originalLocation;
  });

  it("renders welcome text", () => {
    render(<LandingPage />);
    expect(screen.getByText(/Hi, welcome to Fajita/i)).toBeInTheDocument();
  });

  it("renders the PocketID retry control", () => {
    render(<LandingPage />);
    expect(screen.getByRole("button", { name: /continue with pocketid/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /retry pocketid sign-in/i })).toBeInTheDocument();
  });

  it("offers to retry authentication through the configured OIDC proxy", () => {
    render(<LandingPage />);
    expect(screen.getByRole("button", { name: /continue with pocketid/i })).toBeInTheDocument();
  });
});
