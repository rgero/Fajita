import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    surface: {
      secondary: string;
      secondaryContrastText: string;
      tertiary: string;
    };
  }

  interface PaletteOptions {
    surface?: {
      secondary?: string;
      secondaryContrastText?: string;
      tertiary?: string;
    };
  }
}
