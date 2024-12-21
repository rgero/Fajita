import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (!socket) return;
    
    const processPlayStatus = async (data: any) => {
      setPlaying( () => data.player_state_int == 1)
    };

    const processIsPlaying = () => {
      if(!isPlaying)
      {
        setPlaying(true);
        socket.off("player_progress", processIsPlaying);
      }
    }
    
    socket.on("player_status", processPlayStatus);
    socket.on("player_progress", processIsPlaying);
    return () => {
      socket.off("player_status", processPlayStatus);
      socket.off("player_progress", processIsPlaying);
    };
  }, [socket]);

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
    if (socket) {
      socket.emit("play_pause", {queue_id: getQueueID()});
    }
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
