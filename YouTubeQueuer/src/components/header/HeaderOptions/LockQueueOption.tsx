import { Grid, MenuItem } from "@mui/material"

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useQueueProvider } from "../../../context/QueueContext";

const LockQueueOption = ({setShowLockModal} : {setShowLockModal: (showModal: boolean) => void}) => {
  const {queueData} = useQueueProvider();
  const isQueueLocked = queueData?.locked;

  const toggleQueueLock = () => {
    setShowLockModal(true);
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
