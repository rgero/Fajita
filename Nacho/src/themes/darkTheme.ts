import { ThemeOptions } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
  },
  components: {
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
