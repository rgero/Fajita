import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { YouTubeQueueResponse, useYouTubeQueue } from "../../../hooks/useYouTubeQueue";
import { useEffect, useState } from "react";

import { Interaction } from "../../../interfaces/Interaction";
import ShareIcon from '@mui/icons-material/Share';
import { copyToClipboard } from "../../../utils/CopyToClipboard";

const CopyOption = () => {
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
    copyToClipboard(currentlyPlaying);
  }

  return (
    <ListItem key="copy" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <ShareIcon/>
        </ListItemIcon>
        <ListItemText primary="Copy Video URL"/>
      </ListItemButton>
    </ListItem>
  )
}

export default CopyOption
