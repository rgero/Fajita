import { DoNotDisturb, Lock, LockOpen } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import { useQueueProvider } from "../../../context/QueueContext"
import { useSocketProvider } from "../../../context/WebSocketContext"

const LockQueueModal = ({open, closeFn} : {open: boolean, closeFn: () => void}) => {
  const {socket} = useSocketProvider();
  const {queueData} = useQueueProvider();
  
  const processLock = () => {
    if (queueData.locked)
    {
      socket?.emit("unlock_queue", {queue_id: queueData?.id});
    } else {
      socket?.emit("lock_queue", {queue_id: queueData?.id});
    }
    closeFn();
  }

  return (
    <Modal open={open} closeFn={closeFn}>
      <Grid container direction="column" alignContent={"center"} spacing={2}>
        <Grid item>
          <Typography variant="h5">Are you sure you want to {queueData.locked ? "unlock" : "lock"} the queue?</Typography>
        </Grid>
        <Grid item>
          <Grid container justifyContent={"flex-end"} spacing={2}>
            <Grid item>
              <Button onClick={closeFn}  icon={<DoNotDisturb />}  title="Cancel"/>
            </Grid>
            <Grid item>
              <Button onClick={processLock} icon={queueData.locked ? <LockOpen color="success"/> : <Lock color="success"/>} title="Do it"/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default LockQueueModal
