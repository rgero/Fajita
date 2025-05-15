import { ThemeOptions } from "@mui/material/styles";

export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#555555",
          color: "#ffffff", // optional: ensure readable text
          '&:hover': {
            backgroundColor: "#333333", // optional: darker on hover
          },
        },
      },
    },
  },
};
