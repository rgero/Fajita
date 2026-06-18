import { Stack, Typography } from "@mui/material"

const EmptyQueue = () => {
  return (
    <Stack sx={{ alignItems: "center", paddingTop: 4 }}>
      <img width={200} src="fajita.svg"/>
      <Typography variant="h5">The queue is empty.</Typography>
    </Stack>
  )
}

export default EmptyQueue
