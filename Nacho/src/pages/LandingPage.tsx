import { Button, Container, IconButton, Stack, Typography } from "@mui/material"

import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';
import { grey } from "@mui/material/colors";
import { useEffect } from "react";

const LandingPage = () => {
  // Landing page is intentionally theme-independent, so the themed body color is restored on unmount.
  useEffect(() => {
    const previousBackground = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#000000";

    return () => {
      document.body.style.backgroundColor = previousBackground;
    };
  }, []);

  return (
    <Container disableGutters sx={{minWidth: "100%", backgroundColor: "#000000", color: "#FFFFFF"}}>
      <Stack sx={{ height: "100vh", paddingTop: "2rem", alignItems: "center" }}>
        <IconButton
          onClick={() => window.location.reload()}
          aria-label="Retry PocketID sign-in"
          size="large"
        >
          <img width={200} src="fajita.svg"/>
        </IconButton>
        <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }}>Hi, welcome to Fajita</Typography>
        <Button
          variant="contained"
          startIcon={<KeyTwoToneIcon />}
          onClick={() => window.location.reload()}
          sx={{
            marginTop: 5,
            backgroundColor: grey[700],
            color: "#FFFFFF",
            "&:hover": { backgroundColor: grey[600] },
          }}
        >
          Continue with PocketID
        </Button>
      </Stack>

    </Container>
  )
}

export default LandingPage
