import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

import { OpenYouTubeURL } from '@utils/OpenYoutubeURL';
import { YouTube } from "@mui/icons-material";

interface YoutubeMenuOptionProps {
  youtubeId: string;
  onClose: () => void;
}

const YoutubeMenuOption = ({youtubeId, onClose}: YoutubeMenuOptionProps) => {
  const handleOpenYouTube = () => {
    OpenYouTubeURL(youtubeId);
    onClose();
  }
  return (
    <MenuItem onClick={handleOpenYouTube}>
      <ListItemIcon>
        <YouTube fontSize="small" />
      </ListItemIcon>
      <ListItemText>Open in YouTube</ListItemText>
    </MenuItem>
  )
}

export default YoutubeMenuOption
