import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import ShareIcon from '@mui/icons-material/Share';
import { useModalContext } from "@context/modal/ModalContext";
import { useSettings } from "@context/settings/SettingsContext";

const ShareOption = () => {

  const { shareModalOpen, toggleShareModalOpen } = useModalContext();
  const {shareOptions} = useSettings();

  const isAvailable = shareOptions.clipboard || shareOptions.youtube

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
