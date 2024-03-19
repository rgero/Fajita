import { Button, Container, Grid, Typography } from "@mui/material"

const LandingPage = () => {
  return (
    <Container disableGutters sx={{minWidth: "100%", backgroundColor: 'black'}}>
      <Grid container sx={{height: "100vh"}} direction="column" justifyContent="center" alignItems="center">
        <Grid item width="75%">
          <img src="fajita.svg"/>
        </Grid>
        <Grid item>
          <Typography>Do you trust me?</Typography>
        </Grid>
        <Grid>
          <Button href={`${import.meta.env.VITE_BACKEND_URL}/login`}>Login to Fajita</Button>
        </Grid>
      </Grid>

    </Container>
  )
}

export default LandingPage
