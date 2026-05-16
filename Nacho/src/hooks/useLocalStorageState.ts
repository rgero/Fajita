import { useEffect, useState } from "react";

export const useLocalStorageState = (initialState: string|boolean, key: string) => {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return initialState;
    try {
      return JSON.parse(storedValue);
    } catch {
      localStorage.removeItem(key);
      return initialState;
    }
  });

  useEffect(
    () => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
