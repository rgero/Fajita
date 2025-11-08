import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useEffect, useState } from "react";

import { Interaction } from "@interfaces/Interaction";
import toast from "react-hot-toast";
import { useQueueContext } from "@context/queue/QueueContext";
import { useStashContext } from "@context/stash/StashContext";

const AddToStashOption = () => {
  const {queueData} = useQueueContext();
  const {isInStash, addVideoToStash, deleteVideoFromStash} = useStashContext();
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

  const handleAddToStash = async () => {
    if (!currentlyPlaying) {
      toast.error("Nothing currently playing to Stash!");
      return;
    }
    try {
      await addVideoToStash(currentlyPlaying.video.video_id);
      toast.success("Video added to stash");
    } catch {
      toast.error("Failed to add video to stash");
    }
  };

  const handleRemoveFromStash = async () => {
    if (!currentlyPlaying) {
      toast.error("Nothing currently playing to open");
      return;
    }
    try {
      await deleteVideoFromStash(currentlyPlaying?.video.video_id);
      toast.success("Video removed from stash");
    } catch (err: any) {
      toast.error("Failed to remove video from stash");
    }
  }

  return (
    <ListItem key="stash" disablePadding onClick={currentlyPlaying && isInStash(currentlyPlaying.video.video_id) ? handleRemoveFromStash : handleAddToStash}>
      <ListItemButton>
        <ListItemIcon>
          {currentlyPlaying && isInStash(currentlyPlaying.video.video_id) ? <Favorite /> : <FavoriteBorder/> }
        </ListItemIcon>
        <ListItemText primary={currentlyPlaying && isInStash(currentlyPlaying.video.video_id) ? "Remove from Stash" : "Add To Stash"}/>
      </ListItemButton>
    </ListItem>
  )
}

export default AddToStashOption
