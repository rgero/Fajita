import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { createContext, useContext, useEffect, useMemo } from "react";

import CustomToaster from "../components/ui/CustomToaster";
import { darkTheme } from "../themes/darkTheme";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { warmTheme } from "../themes/lightThemes";

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
  const theme = useMemo(() => {
    const baseTheme: ThemeOptions =
      mode === "light" ? warmTheme : darkTheme;

    return createTheme(baseTheme);
  }, [mode]);

  const toggleDarkMode = () => {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
  }, [theme]);

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
