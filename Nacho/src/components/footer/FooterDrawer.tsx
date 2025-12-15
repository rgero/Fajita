import { Box, Divider, List, SwipeableDrawer } from "@mui/material"

import AddToStashOption from "./DrawerOptions/AddToStash"
import OpenStashOption from "./DrawerOptions/OpenStashOption"
import PlayOption from "./DrawerOptions/PlayOption"
import QueueOption from "./DrawerOptions/QueueOption"
import ShareOption from "./DrawerOptions/ShareOption"
import SkipOption from "./DrawerOptions/SkipOption"
import { useSettings } from "@context/settings/SettingsContext"

interface Props {
  isOpen: boolean,
  toggleDrawer: (arg0: boolean) =>  React.ReactEventHandler,
}

const FooterDrawer: React.FC<Props> = ({isOpen, toggleDrawer}) => {
  const {shareOptions} = useSettings();

  const isAvailable = shareOptions.clipboard || shareOptions.youtube

  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Box
        role="presentation"
        data-testid="footer-drawer-content"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <PlayOption/>
          <SkipOption/>
          {isAvailable && <ShareOption/>}
          <Divider/>
          <AddToStashOption/>
          <OpenStashOption/>
          <Divider/>
          <QueueOption/>
        </List>
      </Box>
    </SwipeableDrawer>
  )
}

export default FooterDrawer
