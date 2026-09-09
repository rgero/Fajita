import { ThemeOptions, createTheme } from "@mui/material/styles";

import { deriveSurface } from "@utils/deriveSurface";

// Mirrors the surface derivation done in ThemeProvider so components can be rendered in isolation.
export const buildTestTheme = (options: ThemeOptions = {}) => {
  const base = createTheme(options);
  const paper = base.palette.background.paper;
  const secondary = deriveSurface(paper, base.palette.mode);

  return createTheme(base, {
    palette: {
      surface: {
        secondary,
        secondaryContrastText: base.palette.getContrastText(secondary),
        tertiary: deriveSurface(paper, base.palette.mode, 0.3),
      },
    },
  });
};
