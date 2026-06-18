import { Button, Container, IconButton, Stack, Theme, Typography, useTheme } from "@mui/material"

import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';

const LandingPage = () => {
  const theme: Theme  = useTheme();
  document.body.style.backgroundColor = `${theme.palette.background.paper}`;

  const sendToLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/login?next=nacho`;
  }
  
  return (
    <Container disableGutters sx={{minWidth: "100%", backgroundColor: `${theme.palette.background.paper}`, color: `${theme.palette.primary.light}`}}>
      <Stack sx={{ height: "100vh", paddingTop: "2rem", alignItems: "center" }}>
        <IconButton
          href={`${import.meta.env.VITE_BACKEND_URL}/login?next=nacho`}
          size="large"
        >
          <img width={200} src="fajita.svg"/>
        </IconButton>
        <Typography variant="subtitle1">Hi, welcome to Fajita</Typography>
        <Button variant="contained" startIcon={<KeyTwoToneIcon />} onClick={sendToLogin} sx={{ marginTop: 5 }}>
          Login
        </Button>
      </Stack>

    </Container>
  )
}

export default LandingPage
