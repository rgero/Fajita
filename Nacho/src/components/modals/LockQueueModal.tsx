import { DoNotDisturb, Lock, LockOpen } from "@mui/icons-material"
import { Grid, TextField, Typography } from "@mui/material"

import Button from "../ui/Button";
import Modal from "./Modal";
import { useQueueProvider } from "../../context/QueueContext";
import { useSocketProvider } from "../../context/WebSocketContext";
import { useState } from "react";

const LockQueueModal = ({open, closeFn} : {open: boolean, closeFn: () => void}) => {
  const {toggleLock} = useSocketProvider();
  const [reason, setReason] = useState<string>("");
  const {queueData} = useQueueProvider();
  
  const processLock = () => {
    toggleLock(reason);
    closeFn();
  }

  return (
    <Modal open={open} closeFn={closeFn}>
      <Grid container direction="column" alignContent={"center"} spacing={2} sx={{paddingY: "25px"}}>
        <Grid item>
          <Typography variant="h5">Are you sure you want to {queueData.locked ? "unlock" : "lock"} the queue?</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Reason"
            variant="outlined"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
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
