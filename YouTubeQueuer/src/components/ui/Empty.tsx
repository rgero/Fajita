import { Grid, Typography } from "@mui/material"

interface Props {
  resource: string
}

const Empty: React.FC<Props> = ({resource}) => {
  return (
    <Grid container direction="column" alignItems="center" sx={{paddingTop: 4}}>
      <Grid item>
        <img width={200} src="fajita.svg"/>
      </Grid>
      <Grid item><Typography variant="h5">No {resource} found.</Typography></Grid>
    </Grid>
  )
}

export default Empty
