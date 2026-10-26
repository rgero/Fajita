import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useEffect, useState } from "react";

import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import toast from "react-hot-toast";
import { PlaybackState } from "@context/websocket/WebsocketContext";
import { useSocketProvider } from "@context/websocket/WebsocketContext";

const PlayOption = () => {
  const {socket, playPause} = useSocketProvider();

  const [isPlaying, setPlaying] = useState<boolean|null>(null);
  const [lastPress, setLastPress] = useState<Date|null>(null);

  useEffect(() => {
    if (!socket) return;
    
    const processPlayStatus = (data: { state: PlaybackState }) => {
      setPlaying(data.state === 1);
    };
    
    socket.on("play_pause", processPlayStatus);
    return () => {
      socket.off("play_pause", processPlayStatus);
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
    playPause(isPlaying ? 2 : 1);
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
