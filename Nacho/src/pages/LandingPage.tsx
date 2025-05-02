import { Button, Container, Grid, IconButton, Theme, Typography, useTheme } from "@mui/material"

import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';

const LandingPage = () => {
  const theme: Theme  = useTheme();
  document.body.style.backgroundColor = `${theme.palette.background.paper}`;

  const sendToLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/login?next=nacho`;
  }
  
  return (
    <Container disableGutters sx={{minWidth: "100%", backgroundColor: `${theme.palette.background.paper}`, color: `${theme.palette.primary.light}`}}>
      <Grid container sx={{height: "100vh", paddingTop: "2rem"}} direction="column" alignItems="center">
        <Grid item>
          <IconButton
            href={`${import.meta.env.VITE_BACKEND_URL}/login?next=nacho`}
            size="large"
          >
            <img width={200} src="fajita.svg"/>
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Hi, welcome to Fajita</Typography>
        </Grid>
        <Grid item sx={{paddingTop: 5}}>
        <Button variant="contained" color="success" startIcon={<KeyTwoToneIcon />} onClick={sendToLogin}>
          Login
        </Button>
        </Grid>
      </Grid>

    </Container>
  )
}

export default LandingPage
