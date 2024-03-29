import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import SkipNextIcon from '@mui/icons-material/SkipNext';
import toast from "react-hot-toast";
import { useSocket } from "../../../hooks/useWebSocket";

const SkipOption = () => {
  const socket = useSocket();

  const processClick = () => {
    toast.success("Skipped!");
    socket.emit('skipVideo');
  }

  return (
    <ListItem key="skip" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <SkipNextIcon/>
        </ListItemIcon>
        <ListItemText primary="Skip video"/>
      </ListItemButton>
    </ListItem>
  )
}

export default SkipOption
