import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useContext, useEffect, useMemo } from "react";

import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {}
});

const DarkModeProvider = ({ children }: {children: React.ReactNode}) => {
  const { toasts } = useToasterStore();
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches.toString(),
    "isDarkMode"
  );

  // Limit the number of Toasts displayed
  const TOAST_LIMIT = 2;
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

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
      <Toaster 
        position="bottom-center"
        gutter={12}
        containerStyle={{margin: "8px", bottom:"17.5%"}}
        toastOptions={
          {
            success: {duration: 3000}, 
            error: {duration: 3000},
            loading: {duration: 1500},
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
