// SearchMenu.tsx

import { Favorite, FavoriteBorder, YouTube } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

import { OpenYouTubeURL } from "../../utils/OpenYoutubeURL";
import { YoutubeResponse } from "../../interfaces/YoutubeResponse";
import toast from "react-hot-toast";
import { useStashProvider } from "../../context/StashContext";

interface SearchMenuProps {
  data: YoutubeResponse;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const SearchMenu: React.FC<SearchMenuProps> = ({data, anchorEl, open, onClose}) => {
  const { isInStash, addVideoToStash, deleteVideoFromStash } = useStashProvider();

  const handleAddToStash = async () => {
    try {
      await addVideoToStash(data.id);
      toast.success("Video added to stash");
    } catch (err: any) {
      toast.error("Failed to add video to stash");
    } finally {
      onClose();
    }
  };

  const handleRemoveFromStash = async () => {
    try {
      await deleteVideoFromStash(data.id);
      toast.success("Video removed from stash");
    } catch (err: any) {
      toast.error("Failed to remove video from stash");
    } finally {
      onClose();
    }
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={isInStash(data.id) ? handleRemoveFromStash : handleAddToStash}>
        <ListItemIcon>
            {isInStash(data.id) ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
        </ListItemIcon>
        <ListItemText>
          {isInStash(data.id) ? "Remove from Stash" : "Add to Stash"}
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={() => OpenYouTubeURL(data.id)}>
        <ListItemIcon>
          <YouTube fontSize="small" />
        </ListItemIcon>
        <ListItemText>Open in YouTube</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default SearchMenu;
