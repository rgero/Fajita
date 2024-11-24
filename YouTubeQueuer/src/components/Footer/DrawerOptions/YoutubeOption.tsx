import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

import { Interaction } from "../../../interfaces/Interaction";
import { OpenYouTubeURL } from "../../../utils/OpenYoutubeURL";
import YouTubeIcon from '@mui/icons-material/YouTube';
import toast from "react-hot-toast";
import { useQueueProvider } from "../../../context/QueueContext";

const YoutubeOption = () => {
  const {queueData} = useQueueProvider();
  const [currentlyPlaying, setCurrentPlay] = useState<Interaction | null>(null);

  useEffect(() => {
    if (!queueData || Object.keys(queueData).length === 0) return;

    const currentIndex = queueData.current_index;
    const foundItems = findCurrentlyPlaying(queueData.interactions, currentIndex);

    if (foundItems.length === 1) {
      setCurrentPlay(foundItems[0]);
    }
  }, [queueData]);

  const findCurrentlyPlaying = (interactions: Interaction[], currentIndex: number): Interaction[] => {
    return interactions.filter((option: Interaction) => option.index === currentIndex);
  };

  const processClick = (): void => {
    if (!currentlyPlaying) {
      toast.error("Nothing currently playing to open");
      return;
    }
    OpenYouTubeURL(currentlyPlaying);
  };

  return (
    <ListItem key="copy" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <YouTubeIcon />
        </ListItemIcon>
        <ListItemText primary="Open in YouTube App" />
      </ListItemButton>
    </ListItem>
  );
};

export default YoutubeOption;