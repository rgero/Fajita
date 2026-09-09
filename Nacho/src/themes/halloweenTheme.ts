import { ThemeOptions } from "@mui/material/styles";

export const halloweenTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#F47C20",
      light: "#FFA64D",
      dark: "#B84A0B",
      contrastText: "#1B1019",
    },
    secondary: {
      main: "#9CB36B",
      light: "#BED391",
      dark: "#657943",
      contrastText: "#171C10",
    },
    info: {
      main: "#D09B55",
      light: "#E7BD80",
      dark: "#90652D",
      contrastText: "#1B1019",
    },
    success: {
      main: "#84A653",
    },
    warning: {
      main: "#F09A2B",
    },
    error: {
      main: "#D94C3D",
    },
    background: {
      default: "#1B1019",
      paper: "#301C2A",
    },
    surface: {
      secondary: "#43283A",
      secondaryContrastText: "#FFF3DB",
      tertiary: "#59344B",
    },
    text: {
      primary: "#FFF3DB",
      secondary: "#D9B9A2",
    },
    divider: "#633B4B",
    action: {
      hover: "rgba(244, 124, 32, 0.10)",
      selected: "rgba(244, 124, 32, 0.16)",
      focus: "rgba(244, 124, 32, 0.20)",
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
};