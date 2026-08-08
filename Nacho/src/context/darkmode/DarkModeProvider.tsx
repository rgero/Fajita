import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useMemo } from "react";

import CustomToaster from '@components/ui/CustomToaster';
import { DarkModeContext } from "./DarkModeContext";
import { darkTheme } from "../../themes/darkTheme";
import { useLocalStorageState } from '@hooks/useLocalStorageState';
import { warmTheme } from "../../themes/lightThemes";

export const DarkModeProvider = ({ children }: {children: React.ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
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
    const bg = theme.palette.background?.default ?? "";
    const color = theme.palette.text?.primary ?? "";

    document.body.style.backgroundColor = bg;
    document.body.style.color = color;

    const root = document.getElementById("root");
    if (root) {
      (root as HTMLElement).style.backgroundColor = bg;
      (root as HTMLElement).style.color = color;
    }
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
