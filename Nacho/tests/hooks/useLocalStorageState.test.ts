import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useLocalStorageState } from "@hooks/useLocalStorageState";

describe("useLocalStorageState", () => {
  const key = "test-key";

  beforeEach(() => {
    // Reset mocks and localStorage
    vi.spyOn(Storage.prototype, "getItem").mockClear();
    vi.spyOn(Storage.prototype, "setItem").mockClear();
    localStorage.clear();
  });

  it("returns initial state when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorageState("default", key));

    const [value] = result.current;
    expect(value).toBe("default");
    expect(localStorage.getItem(key)).toBe(JSON.stringify("default"));
  });

  it("loads existing value from localStorage", () => {
    localStorage.setItem(key, JSON.stringify("saved"));
    const { result } = renderHook(() => useLocalStorageState("default", key));

    const [value] = result.current;
    expect(value).toBe("saved");
  });

  it("updates localStorage when value changes", () => {
    const { result } = renderHook(() => useLocalStorageState("default", key));

    act(() => {
      const [, setValue] = result.current;
      setValue("updated");
    });

    const [value] = result.current;
    expect(value).toBe("updated");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify("updated")
    );
  });

  it("supports boolean values", () => {
    const { result } = renderHook(() => useLocalStorageState(false, key));

    act(() => {
      const [, setValue] = result.current;
      setValue(true);
    });

    const [value] = result.current;
    expect(value).toBe(true);
    expect(localStorage.getItem(key)).toBe(JSON.stringify(true));
  });
});
