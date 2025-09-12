import { Grid, Typography } from "@mui/material"

const EmptyQueue = () => {
  return (
    <Grid container direction="column" alignItems="center" sx={{paddingTop: 4}}>
      <Grid>
        <img width={200} src="fajita.svg"/>
      </Grid>
      <Grid><Typography variant="h5">The queue is empty.</Typography></Grid>
    </Grid>
  )
}

export default EmptyQueue
