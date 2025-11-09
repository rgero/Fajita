import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

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

  it("renders the login button with icon", () => {
    render(<LandingPage />);
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it("clicking the login button updates window.location.href", () => {
    render(<LandingPage />);
    const loginButton = screen.getByRole("button", { name: /login/i });
    
    fireEvent.click(loginButton);

    expect(window.location.href).toBe(
      `${import.meta.env.VITE_BACKEND_URL}/login?next=nacho`
    );
  });
});
