import { Container, Grid, IconButton, Theme, Typography, useTheme } from "@mui/material"

const LandingPage = () => {
  const theme: Theme  = useTheme();
  return (
    <Container disableGutters sx={{minWidth: "100%", backgroundColor: `${theme.palette.background.paper}`, color: `${theme.palette.primary.light}`}}>
      <Grid container sx={{height: "100vh", paddingTop: "2rem"}} direction="column" alignItems="center">
        <Grid item>
          <IconButton
            href={`${import.meta.env.VITE_BACKEND_URL}/login`}
          >
            <img width={200} src="fajita.svg"/>
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Hi, welcome to Fajita</Typography>
        </Grid>
      </Grid>

    </Container>
  )
}

export default LandingPage
