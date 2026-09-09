import { ThemeProvider as MuiThemeProvider, ThemeOptions, createTheme } from "@mui/material";
import { ThemeContext, ThemeType } from "./ThemeContext";
import { useEffect, useMemo } from "react";

import CustomToaster from '@components/ui/CustomToaster';
import { darkTheme } from "../../themes/darkTheme";
import { deriveSurface } from "@utils/deriveSurface";
import { fleetTheme } from "../../themes/fleetTheme";
import { useLocalStorageState } from '@hooks/useLocalStorageState';
import { warmTheme } from "../../themes/lightThemes";

export const ThemeProvider = ({ children }: {children: React.ReactNode}) => {
  // Detect system preference on first load
  const getSystemDefault = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  };

  const [selectedTheme, setSelectedTheme] = useLocalStorageState(
    getSystemDefault(),
    "selectedTheme"
  );

  const themeConfig = useMemo(() => {
    if (selectedTheme === "light") return warmTheme;
    if (selectedTheme === "dark") return darkTheme;
    return fleetTheme;
  }, [selectedTheme]);

  const theme = useMemo(() => {
    const options = themeConfig as ThemeOptions;
    const base = createTheme(options);
    const mode = base.palette.mode;
    const paper = base.palette.background.paper;

    // Themes declare surface colors explicitly; derivation is only a fallback for ones that omit them.
    const declared = options.palette?.surface ?? {};
    const secondary = declared.secondary ?? deriveSurface(paper, mode);

    return createTheme(base, {
      palette: {
        surface: {
          secondary,
          secondaryContrastText:
            declared.secondaryContrastText ?? base.palette.getContrastText(secondary),
          tertiary: declared.tertiary ?? deriveSurface(paper, mode, 0.3),
        },
      },
    });
  }, [themeConfig]);

  const setTheme = (newTheme: ThemeType) => {
    setSelectedTheme(newTheme);
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
    <ThemeContext.Provider value={{selectedTheme: selectedTheme as ThemeType, setTheme}}>
      <MuiThemeProvider theme={theme}>
        {children}
        <CustomToaster/>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
