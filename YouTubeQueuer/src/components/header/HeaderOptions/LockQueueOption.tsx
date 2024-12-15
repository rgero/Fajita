import { Grid, MenuItem } from "@mui/material"

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
    <MenuItem onClick={toggleQueueLock}>
      <Grid container direction="row" spacing={1}>
        <Grid item>
          {isQueueLocked ? <LockOpenIcon/> : <LockIcon/>}
        </Grid>
        <Grid item>
          {isQueueLocked ? "Unlock Queue" : "Lock Queue" }
        </Grid>
      </Grid>
    </MenuItem>
  )
}

export default LockQueueOption
