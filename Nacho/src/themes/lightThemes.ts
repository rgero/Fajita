import { ThemeOptions } from "@mui/material/styles";

export const warmTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#246B5E",
      light: "#4F8A7E",
      dark: "#17483F",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#C65335",
      light: "#E17A5E",
      dark: "#8D3925",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#2F6FA5",
      light: "#5B91BC",
      dark: "#214E74",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#3F7D4E",
    },
    warning: {
      main: "#A56612",
    },
    error: {
      main: "#B63D43",
    },
    background: {
      default: "#F4F7F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1C2925",
      secondary: "#56635E",
    },
    divider: "#D9E1DD",
    action: {
      hover: "rgba(36, 107, 94, 0.08)",
      selected: "rgba(36, 107, 94, 0.14)",
      focus: "rgba(36, 107, 94, 0.18)",
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
