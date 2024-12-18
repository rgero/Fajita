import { Grid, Typography } from "@mui/material"

const BlankCard = () => {
  return (
    <Grid container justifyContent="center" spacing={5}>
      <Grid item xs={4} md="auto">
        <img src={"./Daisy.png"} alt={"Nothing Playing"} style={{maxHeight:"6rem", objectFit: "contain"}} />
      </Grid>
      <Grid item xs={8} md={6}>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>Nothing in Queue</Typography>
            </Grid>
          </Grid>
          <Grid container direction="column" spacing={0.25}>
            <Grid item>
              <Typography variant="subtitle2">Have you considered adding songs?</Typography>
            </Grid>
          </Grid>
      </Grid>
    </Grid>
  )
}

export default BlankCard
