import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import QueueMusicIcon from '@mui/icons-material/QueueMusic';

const PlaylistOption = ({isPlaylistOpen, setPlaylistOpen} : {isPlaylistOpen: boolean, setPlaylistOpen: (open: boolean) => void}) => {

  const processClick = () => {
    setPlaylistOpen(!isPlaylistOpen);
  }

  return (
    <ListItem key="skip" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <QueueMusicIcon/>
        </ListItemIcon>
        <ListItemText primary={isPlaylistOpen ? "Collapse Saved Videos" : "Saved Videos"}/>
      </ListItemButton>
    </ListItem>
  )
}

export default PlaylistOption
