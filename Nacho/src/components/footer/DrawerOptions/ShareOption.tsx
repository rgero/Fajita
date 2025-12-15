import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import ShareIcon from '@mui/icons-material/Share';
import { YoutubeResponse } from "@interfaces/YoutubeResponse";
import { getVideoData } from "@utils/YouTubeResponseGenerator";
import { useMemo } from "react";
import { useModalContext } from "@context/modal/ModalContext";
import { useQueueContext } from "@context/queue/QueueContext";
import { useSettings } from "@context/settings/SettingsContext";

const ShareOption = () => {
  const { shareModalOpen, toggleShareModalOpen } = useModalContext();
  const {shareOptions} = useSettings();
  const {queueData} = useQueueContext();

  const videoData: YoutubeResponse | null = useMemo(
    () => getVideoData(queueData),
    [queueData]
  );

  const isAvailable = (shareOptions.clipboard || shareOptions.youtube) && videoData
  if (!isAvailable) return;

  return (
    <ListItem key="queue" disablePadding onClick={toggleShareModalOpen}>
      <ListItemButton>
        <ListItemIcon>
          <ShareIcon/>
        </ListItemIcon>
        <ListItemText primary={shareModalOpen ? "Collapse Share" : "Share Video"}/>
      </ListItemButton>
    </ListItem>
  )
}

export default ShareOption
