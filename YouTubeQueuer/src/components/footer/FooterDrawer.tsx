import { Box, Divider, List, SwipeableDrawer } from "@mui/material"

import CopyOption from "./options/CopyOption"
import PlayOption from "./options/PlayOption"
import QueueOption from "./options/QueueOption"
import SearchOption from "./options/SearchOption"
import SkipOption from "./options/SkipOption"
import YoutubeOption from "./options/YoutubeOption"
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
          <YoutubeOption/>
          <CopyOption/>
          <Divider/>
          {!isQueue ? <QueueOption/> : <SearchOption/>}
        </List>
      </Box>
    </SwipeableDrawer>
  )
}

export default FooterDrawer
