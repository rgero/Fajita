import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useCallback, useEffect, useState } from "react";

import { Message } from "../../../interfaces/Message";
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import toast from "react-hot-toast";
import { useQueueProvider } from "../../../context/QueueContext";
import { useSocketProvider } from "../../../context/WebSocketContext";

const PlayOption = () => {
  const {socket} = useSocketProvider();
  const {getQueueID} = useQueueProvider();

  const [isPlaying, setPlaying] = useState<boolean|null>(false);
  const [lastPress, setLastPress] = useState<Date|null>(new Date());

  const onMessage = useCallback( async (message:Message) => {
    setPlaying( () => message.player_state_int == 1)
  }, []);

  const processIsPlaying = useCallback( async () => {
    if (!socket) return;
    if(!isPlaying)
    {
      setPlaying(true);
      socket.off("progressChanged", processIsPlaying);
    }
  }, [])

  useEffect(() => {
    if (!socket) return;
    
    socket.on("player_status", onMessage);
    socket.on("progressChanged", processIsPlaying);
    return () => {
      socket.off("player_status", onMessage);
      socket.off("progressChanged", processIsPlaying);
    };
  }, [socket, onMessage]);

  const processClick = () => {
    if (lastPress)
    {
      const delta:number = new Date().getTime() - lastPress.getTime();
      if (delta < 1500)
      {
        toast.loading(`You're going too fast!`)
        return;
      }
      
    }
    setLastPress (() => new Date());
    socket.emit("playPause", {queue_id: getQueueID()});
  }

  return (
    <ListItem key="playing" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          {isPlaying ? <PauseCircleOutlineIcon/> : <PlayArrowIcon/> }
        </ListItemIcon>
        <ListItemText primary={isPlaying ? "Pause Video" : "Play Video"}/>
      </ListItemButton>
    </ListItem>
  )
}

export default PlayOption
