import { Clear, DoNotDisturb, Lock, LockOpen } from "@mui/icons-material"
import { Fade, Grid, TextField, Typography } from "@mui/material"

import Button from "../ui/Button";
import Modal from "./Modal";
import { useModalContext } from "@context/modal/ModalContext";
import { useQueueContext } from '@context/queue/QueueContext';
import { useSocketProvider } from '@context/websocket/WebsocketContext';
import { useState } from "react";

const LockQueueModal = () => {
  const {lockQueueModalOpen, toggleLockQueueModalOpen} = useModalContext();
  const {toggleLock} = useSocketProvider();
  const [reason, setReason] = useState<string>("");
  const {queueData} = useQueueContext();
  
  const processLock = () => {
    toggleLock(reason);
    toggleLockQueueModalOpen();
  }

  return (
    <Modal open={lockQueueModalOpen} closeFn={toggleLockQueueModalOpen}>
      <Grid container direction="column" alignContent={"center"} spacing={2} sx={{paddingY: "25px"}}>
        <Grid>
          <Typography variant="h5">Are you sure you want to {queueData.locked ? "unlock" : "lock"} the queue?</Typography>
        </Grid>
        <Grid>
          <TextField
            label="Reason"
            variant="outlined"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={`Enter reason for ${queueData.locked ? "unlocking" : "locking"} the queue`}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid>
          <Grid container justifyContent={"flex-end"} spacing={2}>
            {reason && (
              <Grid>
                <Fade in={Boolean(reason)} timeout={500}>
                  <span>
                    <Button onClick={() => setReason("")} icon={<Clear />} title="Clear" color="warning"/>
                  </span>
                </Fade>
              </Grid>
            )}
            <Grid>
              <Button onClick={toggleLockQueueModalOpen}  icon={<DoNotDisturb />}  title="Cancel"/>
            </Grid>
            <Grid>
              <Button onClick={processLock} icon={queueData.locked ? <LockOpen color="success"/> : <Lock color="success"/>} title="Do it"/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default LockQueueModal
