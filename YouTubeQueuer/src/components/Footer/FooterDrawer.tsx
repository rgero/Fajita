import { Box, Divider, List, SwipeableDrawer } from "@mui/material"

import CopyOption from "./DrawerOptions/CopyOption"
import PlayOption from "./DrawerOptions/PlayOption"
import QueueOption from "./DrawerOptions/QueueOption"
import SearchOption from "./DrawerOptions/SearchOption"
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
          <Divider/>
          <CopyOption/>
          <Divider/>
          {!isQueue ? <QueueOption/> : <SearchOption/>}
        </List>
      </Box>
    </SwipeableDrawer>
  )
}

export default FooterDrawer
