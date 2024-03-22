import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useCallback, useEffect, useState } from "react";

import { Message } from "../../../interfaces/Message";
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useSocket } from "../../../hooks/useWebSocket";

const PlayOption = () => {
  const socket = useSocket();
  const [isPlaying, setPlaying] = useState<boolean|null>();

  const onMessage = useCallback( async (message:Message) => {
    setPlaying( () => message.player_state_int == 1)
  }, []);

  useEffect(() => {
    socket.on("player_status", onMessage);
    return () => {
      socket.off("player_status", onMessage);
    };
  }, [socket, onMessage]);

  const processClick = () => {
    socket.emit("playPause");
  }

  return (
    <ListItem key="playing" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          {isPlaying ? <PauseCircleOutlineIcon/> : <PlayArrowIcon/> }
        </ListItemIcon>
        <ListItemText primary={ isPlaying == null ? "Toggle Play" : (isPlaying ? "Pause Video" : "Play Video")}/>
      </ListItemButton>
    </ListItem>
  )
}

export default PlayOption
