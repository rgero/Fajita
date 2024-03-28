import { Box, CircularProgress } from "@mui/material"

const Spinner = () => {
  return (
    <Box display="flex" justifyContent="center" sx={{paddingTop: 4}}>
      <CircularProgress/>
    </Box>
  )
}

export default Spinner
