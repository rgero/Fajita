import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

import { Share } from "@mui/icons-material";
import { copyVideoIDToClipboard } from '@utils/CopyToClipboard';

interface CopyMenuOptionProps {
  youtubeId: string;
  onClose: () => void;
}

const CopyMenuOption = ({youtubeId, onClose}: CopyMenuOptionProps) => {
  const processClick = () => {
    copyVideoIDToClipboard(youtubeId);
    onClose();
  }

  return (
    <MenuItem onClick={processClick}>
      <ListItemIcon>
        <Share/>
      </ListItemIcon>
      <ListItemText primary="Copy Video URL"/>
    </MenuItem>
  )
}

export default CopyMenuOption
