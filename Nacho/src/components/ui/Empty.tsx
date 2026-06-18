import { Stack, Typography } from "@mui/material"

interface Props {
  resource: string
}

const Empty: React.FC<Props> = ({resource}) => {
  return (
    <Stack sx={{ alignItems: "center", paddingTop: 4 }}>
      <img width={200} src="fajita.svg"/>
      <Typography variant="h5">No {resource} found.</Typography>
    </Stack>
  )
}

export default Empty
