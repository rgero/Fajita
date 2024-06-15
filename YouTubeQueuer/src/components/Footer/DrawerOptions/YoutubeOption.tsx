import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { YouTubeQueueResponse, useYouTubeQueue } from "../../../hooks/useYouTubeQueue";
import { useEffect, useState } from "react";

import { Interaction } from "../../../interfaces/Interaction";
import { OpenYouTubeURL } from "../../../utils/OpenYoutubeURL";
import YouTubeIcon from '@mui/icons-material/YouTube';
import toast from "react-hot-toast";

const YoutubeOption = () => {
  const {queueData} : YouTubeQueueResponse = useYouTubeQueue();
  const [currentlyPlaying, setCurrentPlay] = useState<Interaction|null>(null);

  useEffect(() => {
    if (Object.keys(queueData).length === 0) return;
    const currentIndex = queueData.current_index;
    const foundItems = queueData.interactions.filter((option: Interaction) =>{
      return option.index == currentIndex;
    })
    
    if (foundItems.length == 1)
    {
      setCurrentPlay( () => foundItems[0]);
    }
  }, [queueData])

  const processClick = () => {
    if (!currentlyPlaying)
    {
      toast.error("Nothing currently playing to open")
      return;
    }
    OpenYouTubeURL(currentlyPlaying);
  }

  return (
    <ListItem key="copy" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <YouTubeIcon/>
        </ListItemIcon>
        <ListItemText primary="Open in YouTube App"/>
      </ListItemButton>
    </ListItem>
  )
}

export default YoutubeOption
