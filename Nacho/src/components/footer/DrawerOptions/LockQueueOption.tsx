import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useQueueProvider } from "../../../context/QueueContext";
import { useSocketProvider } from "../../../context/WebSocketContext";

const LockQueueOption = () => {
  const {queueData} = useQueueProvider();
  const {socket} = useSocketProvider();
  const isQueueLocked = queueData?.locked;
  const toggleQueueLock = () => {
    if (isQueueLocked)
    {
      socket?.emit("unlock_queue", {queue_id: queueData?.id});
    } else {
      socket?.emit("lock_queue", {queue_id: queueData?.id});
    }
  }

  return (
    <ListItem key="queue" disablePadding onClick={toggleQueueLock}>
      <ListItemButton>
        <ListItemIcon>
          {isQueueLocked ? <LockOpenIcon/> : <LockIcon/>}
        </ListItemIcon>
        <ListItemText primary={isQueueLocked ? "Unlock Queue" : "Lock Queue"}/>
      </ListItemButton>
    </ListItem>
  )
}

export default LockQueueOption
