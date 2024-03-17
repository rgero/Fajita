import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import { useState } from "react";

const ClosedCaptionOption = () => {
  // Get Closed Captioning State
  const [ccOn, setCCStatus] = useState(false);

  const processClick = () => {
    setCCStatus( (prevValue) => !prevValue);
  }

  return (
    <ListItem key="closedcaptions" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <ClosedCaptionIcon/>
        </ListItemIcon>
        <ListItemText primary={ ccOn ? "Turn on Closed Captions" : "Turn off Closed Captions"}/>
      </ListItemButton>
    </ListItem>
  )
}

export default ClosedCaptionOption
