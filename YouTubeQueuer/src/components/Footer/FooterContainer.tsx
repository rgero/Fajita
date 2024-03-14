import * as React from 'react';

import Box from '@mui/material/Box';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import FooterCard from './FooterCard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import QueueIcon from '@mui/icons-material/Queue';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const options = [
  { key: "play", label: "Play", icon: <PlayArrowIcon/>, func: () => {console.log("Play")}},
  { key: "pause", label: "Pause", icon: <PauseCircleOutlineIcon/>, func: () => {console.log("Pause")}},
  { key: "skip", label: "Skip", icon: <SkipNextIcon/>, func: () => {console.log("Skip")}},
  { key: "closedcaptions", label: "Turn on Closed Captions", icon: <ClosedCaptionIcon/>,func: () => {console.log("CC")}},
  { key: "queue", label: "View Queue", icon: <QueueIcon/>, func: () => {console.log("View Queue")} },
]

export default function Footer() {
  const [isOpen, setOpen] = React.useState(false);


  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => 
  {
    if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <div className="sticky bottom-0 z-25 w-full border-gray-200 bg-gray-900 pb-5 pt-2 px-2 text-white" onClick={toggleDrawer(true)}>
      <div className="px-1 flex flex-row justify-between">
        <FooterCard/>
      </div>
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
            {options.map((option) => (
              <ListItem key={option.key} disablePadding onClick={option.func}>
                <ListItemButton>
                  <ListItemIcon>
                    {option.icon}
                  </ListItemIcon>
                  <ListItemText primary={option.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}