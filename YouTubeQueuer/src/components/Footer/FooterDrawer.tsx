import { Box, Divider, List, SwipeableDrawer } from "@mui/material"

import ClosedCaptionOption from "./DrawerOptions/ClosedCaptionOption"
import HomeOption from "./DrawerOptions/HomeOption"
import PlayOption from "./DrawerOptions/PlayOption"
import QueueOption from "./DrawerOptions/QueueOption"
import SkipOption from "./DrawerOptions/SkipOption"
import { useLocation } from "react-router-dom"

interface Props {
  isOpen: boolean,
  toggleDrawer: (arg0: boolean) =>  React.ReactEventHandler,
}

const FooterDrawer: React.FC<Props> = ({isOpen, toggleDrawer}) => {
  const route = useLocation();
  const isQueue = route.pathname.includes("queue");


  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(false)}
    >
      <Box
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <PlayOption/>
          <SkipOption/>
          <ClosedCaptionOption/>
          <Divider/>
          {!isQueue ? <QueueOption/> : <HomeOption/>}
        </List>
      </Box>
    </SwipeableDrawer>
  )
}

export default FooterDrawer
