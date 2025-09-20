import { Box, Divider, List, SwipeableDrawer } from "@mui/material"

import AddToStashOption from "./DrawerOptions/AddToStash"
import OpenStashOption from "./DrawerOptions/OpenStashOption"
import PlayOption from "./DrawerOptions/PlayOption"
import QueueOption from "./DrawerOptions/QueueOption"
import SkipOption from "./DrawerOptions/SkipOption"

interface Props {
  isOpen: boolean,
  toggleDrawer: (arg0: boolean) =>  React.ReactEventHandler,
}

const FooterDrawer: React.FC<Props> = ({isOpen, toggleDrawer}) => {
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
