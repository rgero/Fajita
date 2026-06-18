import { Box, CircularProgress } from "@mui/material"

const Spinner = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
      <CircularProgress/>
    </Box>
  )
}

export default Spinner
