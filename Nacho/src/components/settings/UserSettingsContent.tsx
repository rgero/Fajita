import { Box, Divider, Typography } from "@mui/material"

import DarkModeToggle from "./options/DarkModeToggle"
import EnableExperimentalOption from "./options/EnableExperimentalOption"
import FooterCardOptions from "./options/FooterCardOptions"
import ShareOptions from "./options/ShareOptions"
import StashOptions from "./options/StashOptions"

const UserSettingsContent = () => {
  return (
    <Box style={{paddingTop: "1rem"}}>
      <Box>
        <Typography variant="body1" sx={{fontWeight: "bold"}}>General Settings</Typography>
        <DarkModeToggle/>
        <EnableExperimentalOption/>
      </Box>
      <Divider/>
      <Box>
        <Typography variant="body1" sx={{fontWeight: "bold"}}>Currently Playing Options</Typography>
        <FooterCardOptions/>
      </Box>
      <Divider/>
      <Box>
        <Typography variant="body1" sx={{fontWeight: "bold"}}>Sharing Options</Typography>
        <ShareOptions/>
      </Box>
      <Divider/>
      <Box>
        <Typography variant="body1" sx={{fontWeight: "bold"}}>Stash Options</Typography>
        <StashOptions/>
      </Box>
    </Box>
  )
}

export default UserSettingsContent
