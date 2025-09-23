import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

import toast from "react-hot-toast";
import { useStashProvider } from "../../../context/stash/StashContext";

interface StashMenuOptionProps {
  youtubeId: string;
  onClose: () => void;
}

const StashMenuOption = ({youtubeId, onClose}: StashMenuOptionProps) => {
  const { isInStash, addVideoToStash, deleteVideoFromStash } = useStashProvider();
  const handleAddToStash = async () => {
    try {
      await addVideoToStash(youtubeId);
      toast.success("Video added to stash");
    } catch (err: any) {
      toast.error("Failed to add video to stash");
    } finally {
      onClose();
    }
  };

  const handleRemoveFromStash = async () => {
    try {
      await deleteVideoFromStash(youtubeId);
      toast.success("Video removed from stash");
    } catch (err: any) {
      toast.error("Failed to remove video from stash");
    } finally {
      onClose();
    }
  };

  return (
    <MenuItem onClick={isInStash(youtubeId) ? handleRemoveFromStash : handleAddToStash}>
      <ListItemIcon>
          {isInStash(youtubeId) ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
      </ListItemIcon>
      <ListItemText>
        {isInStash(youtubeId) ? "Remove from Stash" : "Add to Stash"}
      </ListItemText>
    </MenuItem>
  )
}

export default StashMenuOption
