import { ThemeContext, useTheme } from "@context/theme/ThemeContext";
import { describe, expect, it, vi } from "vitest";

import React from "react";
import { renderHook } from "@testing-library/react";

describe("useTheme", () => {
  it("returns theme context when used inside provider", () => {
    const setTheme = vi.fn();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider
        value={{ selectedTheme: "light", setTheme }}
      >
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.selectedTheme).toBe("light");

    result.current.setTheme("dark");
    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("throws an error when used outside provider", () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("ThemeContext was used outside of ThemeProvider");
  });
});
