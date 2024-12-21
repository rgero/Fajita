import { Box, Typography } from "@mui/material"

import DarkModeToggle from "./options/DarkModeToggle"
import FooterCardOptions from "./options/FooterCardOptions"

const UserSettingsContent = () => {
  return (
    <Box style={{paddingTop: "1rem"}}>
      <Box>
        <Typography variant="body1">General Settings</Typography>
        <DarkModeToggle/>
      </Box>
      <Box>
        <Typography variant="body1">Currently Playing Options</Typography>
        <FooterCardOptions/>
      </Box>
    </Box>
  )
}

export default UserSettingsContent
