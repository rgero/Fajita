import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { AuthContext } from "@context/authentication/AuthenticationContext";
import { AuthenticationProvider } from "@context/authentication/AuthenticationProvider";
import React from "react";
import { useQuery } from "@tanstack/react-query";

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual<any>("@tanstack/react-query");
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

const mockedUseQuery = vi.mocked(useQuery);

const TestConsumer = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) return null;

  return (
    <div>
      <span data-testid="loading">{String(auth.isLoading)}</span>
      <span data-testid="authenticated">{String(auth.isAuthenticated)}</span>
      <span data-testid="fetchStatus">{auth.fetchStatus}</span>
      <span data-testid="userId">{auth.user?.id ?? "none"}</span>
    </div>
  );
};

describe("AuthenticationProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides authenticated user when user exists", () => {
    mockedUseQuery.mockReturnValue({
      data: { id: 1, name: "Test User" },
      isLoading: false,
      fetchStatus: "idle",
    } as any);

    render(
      <AuthenticationProvider>
        <TestConsumer />
      </AuthenticationProvider>
    );

    expect(screen.getByTestId("authenticated").textContent).toBe("true");
    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("fetchStatus").textContent).toBe("idle");
    expect(screen.getByTestId("userId").textContent).toBe("1");
  });

  it("provides unauthenticated state when user is undefined", () => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      fetchStatus: "idle",
    } as any);

    render(
      <AuthenticationProvider>
        <TestConsumer />
      </AuthenticationProvider>
    );

    expect(screen.getByTestId("authenticated").textContent).toBe("false");
    expect(screen.getByTestId("userId").textContent).toBe("none");
  });

  it("passes loading state correctly", () => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      fetchStatus: "fetching",
    } as any);

    render(
      <AuthenticationProvider>
        <TestConsumer />
      </AuthenticationProvider>
    );

    expect(screen.getByTestId("loading").textContent).toBe("true");
    expect(screen.getByTestId("fetchStatus").textContent).toBe("fetching");
  });
});
