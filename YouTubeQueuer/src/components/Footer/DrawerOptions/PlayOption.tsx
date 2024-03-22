import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useSocket } from "../../../hooks/useWebSocket";
import { useState } from "react";

const PlayOption = () => {
  const socket = useSocket();
  const [isPlaying, setPlaying] = useState(false);


  const processClick = () => {
    socket.emit("playPause");
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
