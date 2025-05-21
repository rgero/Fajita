import { Favorite, FavoriteBorder, YouTube } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

import { OpenYouTubeURL } from "../../utils/OpenYoutubeURL";
import toast from "react-hot-toast";
import { useStashProvider } from "../../context/StashContext";

interface SearchMenuProps {
  youtubeId: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const InfoMenu: React.FC<SearchMenuProps> = ({youtubeId, anchorEl, open, onClose}) => {
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

  const handleOpenYouTube = () => {
    OpenYouTubeURL(youtubeId);
    onClose();
  }

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={isInStash(youtubeId) ? handleRemoveFromStash : handleAddToStash}>
        <ListItemIcon>
            {isInStash(youtubeId) ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
        </ListItemIcon>
        <ListItemText>
          {isInStash(youtubeId) ? "Remove from Stash" : "Add to Stash"}
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOpenYouTube}>
        <ListItemIcon>
          <YouTube fontSize="small" />
        </ListItemIcon>
        <ListItemText>Open in YouTube</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default InfoMenu;
