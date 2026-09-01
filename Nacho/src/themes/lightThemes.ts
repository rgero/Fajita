import { ThemeOptions } from "@mui/material/styles";

export const warmTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#C9473C",
      light: "#E66F63",
      dark: "#923129",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#B94F6A",
      light: "#E493A6",
      dark: "#84364A",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#A45F2A",
      light: "#CE8B4E",
      dark: "#71401D",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#5E8F36",
    },
    warning: {
      main: "#A96D13",
    },
    error: {
      main: "#B73732",
    },
    background: {
      default: "#FFF7E8",
      paper: "#FFFDF8",
    },
    text: {
      primary: "#241C18",
      secondary: "#68564C",
    },
    divider: "#E8D6B8",
    action: {
      hover: "rgba(201, 71, 60, 0.08)",
      selected: "rgba(201, 71, 60, 0.14)",
      focus: "rgba(201, 71, 60, 0.18)",
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
