import { DarkModeContext, useDarkMode } from "@context/darkmode/DarkModeContext";
import { describe, expect, it, vi } from "vitest";

import React from "react";
import { renderHook } from "@testing-library/react";

describe("useDarkMode", () => {
  it("returns dark mode context when used inside provider", () => {
    const toggleDarkMode = vi.fn();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DarkModeContext.Provider
        value={{ isDarkMode: true, toggleDarkMode }}
      >
        {children}
      </DarkModeContext.Provider>
    );

    const { result } = renderHook(() => useDarkMode(), { wrapper });

    expect(result.current.isDarkMode).toBe(true);

    result.current.toggleDarkMode();
    expect(toggleDarkMode).toHaveBeenCalledOnce();
  });

  it("throws an error when used outside provider", () => {
    expect(() => {
      renderHook(() => useDarkMode());
    }).toThrow("DarkModeContext was used outside of DarkModeProvider");
  });
});
