import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createContext, useContext, useMemo } from "react";

import { Toaster } from "react-hot-toast";
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
        },
        transitions: {
          duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            // most basic recommended timing
            standard: 300,
            // this is to be used in complex animations
            complex: 375,
            // recommended when something is entering screen
            enteringScreen: 225,
            // recommended when something is leaving screen
            leavingScreen: 195,
          },
        },
      }),
    [mode]
  );

  const toggleDarkMode = () => {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
      <Toaster 
        position="bottom-center"
        gutter={12}
        containerStyle={{margin: "8px"}}
        toastOptions={
          {
            success: {duration: 3000}, 
            error: {duration: 5000},
            style: { 
              fontSize: '16px',
              fontWeight: 'bold',
              maxWidth: '500px', 
              padding: '16px 24px', 
              backgroundColor: `${theme.palette.background.paper}`, 
              color: `${theme.palette.text.primary}` 
            }
          }
        }
      />
    </DarkModeContext.Provider>
  );
}

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
