import { Button, Container, Grid } from "@mui/material"

const LandingPage = () => {
  return (
    <Container disableGutters sx={{minWidth: "100%", backgroundColor: 'black'}}>
      <Grid container sx={{height: "100vh"}} direction="column" justifyContent="center" alignItems="center">
        <Grid item>
          <img width={200} src="fajita.svg"/>
        </Grid>
        <Grid>
          <Button href={`${import.meta.env.VITE_BACKEND_URL}/login`}>Login to Fajita</Button>
        </Grid>
      </Grid>

    </Container>
  )
}

export default LandingPage
