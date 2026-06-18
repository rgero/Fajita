import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useEffect, useRef, useState } from "react";

import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import toast from "react-hot-toast";
import { useSocketProvider } from "@context/websocket/WebsocketContext";

const PlayOption = () => {
  const {socket, playPause} = useSocketProvider();

  const [isPlaying, setPlaying] = useState<boolean|null>(false);
  const [lastPress, setLastPress] = useState<Date|null>(new Date());
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!socket) return;
    
    const processPlayStatus = async (data: any) => {
      setPlaying(data.player_state_int === 1);
    };

    const processIsPlaying = () => {
      if (!isPlayingRef.current) {
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
    playPause();
  }

  return (
    <ListItem key="playing" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          {isPlaying ? <PauseCircleOutlinedIcon/> : <PlayArrowIcon/> }
        </ListItemIcon>
        <ListItemText primary={isPlaying ? "Pause Video" : "Play Video"}/>
      </ListItemButton>
    </ListItem>
  )
}

export default PlayOption
