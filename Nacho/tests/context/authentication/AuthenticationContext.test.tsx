import { AuthContext, AuthContextType, useAuth } from "@context/authentication/AuthenticationContext";
import { describe, expect, it } from "vitest";

import { renderHook } from "@testing-library/react";

describe("useAuth", () => {
  it("returns auth context when used inside AuthProvider", () => {
    const mockContext: AuthContextType = {
      user: {
        id: "123",
        email: "",
        first_name: "Test User",
        picture: ""
      },
      isLoading: false,
      isAuthenticated: true,
      fetchStatus: "success",
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={mockContext}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toEqual(mockContext);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.first_name).toBe("Test User");
  });

  it("throws an error when used outside AuthProvider", () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth must be used within an AuthProvider");
  });
});
