import { createContext, useContext } from "react";

export type ThemeType = "light" | "dark" | "fleet";

export type ThemeContextType = {
  selectedTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext was used outside of ThemeProvider");
  }
  return context;
};
