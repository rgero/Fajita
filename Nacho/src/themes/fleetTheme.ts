import { ThemeOptions } from "@mui/material/styles";

export const fleetTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#173F35",
      light: "#2B6B5F",
      dark: "#0F2A26",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D4A574",
      light: "#E6C5A0",
      dark: "#A67D52",
      contrastText: "#1C1C1C",
    },
    info: {
      main: "#E89B4B",
      light: "#F0B878",
      dark: "#C47A2A",
      contrastText: "#1C1C1C",
    },
    success: {
      main: "#6ABF59",
      light: "#87D480",
      dark: "#4F9440",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFA726",
      light: "#FFB84D",
      dark: "#E67E22",
      contrastText: "#1C1C1C",
    },
    error: {
      main: "#EF5350",
      light: "#F16A6A",
      dark: "#C62828",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#0F1F1D",
      paper: "#1A2E2A",
    },
    text: {
      primary: "#E8F0EE",
      secondary: "#A8C5BF",
    },
    divider: "#2B5050",
    action: {
      hover: "rgba(212, 165, 116, 0.08)",
      selected: "rgba(212, 165, 116, 0.14)",
      focus: "rgba(212, 165, 116, 0.18)",
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
