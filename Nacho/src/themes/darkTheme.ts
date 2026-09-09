import { ThemeOptions } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: grey[400],
      light: grey[300],
      dark: grey[600],
      contrastText: "#111111",
    },
    secondary: {
      main: grey[500],
      light: grey[400],
      dark: grey[700],
      contrastText: "#111111",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#ECECEC",
      secondary: "#A8A8A8",
    },
    divider: "#2F2F2F",
    action: {
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.14)",
      focus: "rgba(255, 255, 255, 0.18)",
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
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "contained", color: "primary" },
              style: {
                backgroundColor: grey[700],
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: grey[600],
                },
              },
            },
            {
              props: { variant: "outlined", color: "primary" },
              style: {
                borderColor: grey[500],
                color: "#FFFFFF",
                "&:hover": {
                  borderColor: grey[400],
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
              },
            },
            {
              props: { variant: "text", color: "primary" },
              style: {
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
              },
            },
          ],
        },
      },
    },
  },
};
