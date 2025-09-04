import { ThemeOptions } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: grey[700],
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: grey[600],
          },
        },
        outlinedPrimary: {
          borderColor: grey[500],
          color: "#FFFFFF",
          "&:hover": {
            borderColor: grey[400],
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        },
        textPrimary: {
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        },
      }
    }
  }
};
