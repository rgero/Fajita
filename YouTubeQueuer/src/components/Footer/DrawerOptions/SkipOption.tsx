import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import SkipNextIcon from '@mui/icons-material/SkipNext';
import toast from "react-hot-toast";
import { useQueueProvider } from "../../../context/QueueContext";
import { useSocketProvider } from "../../../context/WebSocketContext";

const SkipOption = () => {
  const {socket} = useSocketProvider();
  const {getQueueID} = useQueueProvider();

  const processClick = () => {
    toast.success("Skipped!");
    socket.emit('skipVideo', {queue_id: getQueueID()});
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
