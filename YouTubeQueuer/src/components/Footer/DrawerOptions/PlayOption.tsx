import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState } from "react";

const PlayOption = () => {
  // Get Closed Captioning State
  const [isPlaying, setPlaying] = useState(false);

  const processClick = () => {
    setPlaying( (prevValue) => !prevValue);
  }

  return (
    <ListItem key="playing" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          {isPlaying ? <PauseCircleOutlineIcon/> : <PlayArrowIcon/> }
        </ListItemIcon>
        <ListItemText primary={ isPlaying ? "Pause Video" : "Play Video"}/>
      </ListItemButton>
    </ListItem>
  )
}

export default PlayOption
