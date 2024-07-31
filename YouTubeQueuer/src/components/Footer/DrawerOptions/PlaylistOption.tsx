import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { useNavigate } from "react-router-dom";

const PlaylistOption = () => {
  const navigate = useNavigate();

  const processClick = () => {
    navigate("/playlists");
  }

  return (
    <ListItem key="skip" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <QueueMusicIcon/>
        </ListItemIcon>
        <ListItemText primary="View Playlist"/>
      </ListItemButton>
    </ListItem>
  )
}

export default PlaylistOption
