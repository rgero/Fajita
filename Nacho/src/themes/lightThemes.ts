import { ThemeOptions } from "@mui/material/styles";

export const warmTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#ff7043",  // Warm orange
    },
    secondary: {
      main: "#ffcc80",  // Soft apricot
    },
    info : {
      main: "#ffab40",  // Warm amber
    },
    background: {
      default: "#fff8e1",  // Warm ivory
      paper: "#e0d6c7",    // Paper white
    },
    text: {
      primary: "#4e342e",  // Dark brown
      secondary: "#6d4c41", // Soft brown
    },
  }
};
