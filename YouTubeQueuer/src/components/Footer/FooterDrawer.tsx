import { Box, Divider, List, SwipeableDrawer } from "@mui/material"

import CopyOption from "./DrawerOptions/CopyOption"
import PlayOption from "./DrawerOptions/PlayOption"
import QueueOption from "./DrawerOptions/QueueOption"
import SkipOption from "./DrawerOptions/SkipOption"
import YoutubeOption from "./DrawerOptions/YoutubeOption"

interface Props {
  isOpen: boolean,
  toggleDrawer: (arg0: boolean) =>  React.ReactEventHandler,
  setQueueOpen: (arg0: boolean) =>  void,
}

const FooterDrawer: React.FC<Props> = ({isOpen, toggleDrawer, setQueueOpen}) => {
  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Box
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <PlayOption/>
          <SkipOption/>
          <Divider/>
          <YoutubeOption/>
          <CopyOption/>
          <Divider/>
          <QueueOption setQueueOpen={setQueueOpen}/>
        </List>
      </Box>
    </SwipeableDrawer>
  )
}

export default FooterDrawer
