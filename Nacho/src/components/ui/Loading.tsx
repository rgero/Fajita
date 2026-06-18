import { CircularProgress, Container, CssBaseline, Grid } from "@mui/material"

const Loading = () => {
  return (
    <>
      <CssBaseline/>
      <Container disableGutters>
        <Grid container sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Grid>
      </Container>
    </>

  )
}

export default Loading
