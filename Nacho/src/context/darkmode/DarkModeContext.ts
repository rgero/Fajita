import { createContext, useContext } from "react";

export type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  }
  return context;
};
