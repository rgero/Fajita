import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useContext, useMemo } from "react";

import CustomToaster from "../components/ui/CustomToaster";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {}
});

const DarkModeProvider = ({ children }: {children: React.ReactNode}) => {

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches.toString(),
    "isDarkMode"
  );

  const mode = isDarkMode ? "dark" : "light";
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        }
      }),
    [mode]
  );

  const toggleDarkMode = () => {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
      <CustomToaster/>
    </DarkModeContext.Provider>
  );
}

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
