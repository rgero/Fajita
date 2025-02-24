import { Box, Typography } from "@mui/material"

import DarkModeToggle from "./options/DarkModeToggle"
import FooterCardOptions from "./options/FooterCardOptions"
import ShareOptions from "./options/ShareOptions"
import StashOptions from "./options/StashOptions"

const UserSettingsContent = () => {
  return (
    <Box style={{paddingTop: "1rem"}}>
      <Box>
        <Typography variant="body1" sx={{fontWeight: "bold"}}>General Settings</Typography>
        <DarkModeToggle/>
      </Box>
      <Box>
        <Typography variant="body1" sx={{fontWeight: "bold"}}>Currently Playing Options</Typography>
        <FooterCardOptions/>
      </Box>
      <Box>
        <Typography variant="body1" sx={{fontWeight: "bold"}}>Sharing Options</Typography>
        <ShareOptions/>
      </Box>
      <Box>
        <Typography variant="body1" sx={{fontWeight: "bold"}}>Stash Options</Typography>
        <StashOptions/>
      </Box>
    </Box>
  )
}

export default UserSettingsContent
