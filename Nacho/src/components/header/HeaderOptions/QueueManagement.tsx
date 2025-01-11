import { Cameraswitch, QueueMusic } from "@mui/icons-material";
import { Grid, MenuItem } from "@mui/material"

import { useQueueProvider } from "../../../context/QueueContext";

const QueueManagement = ({setOpen} : {setOpen : (open: boolean) => void}) => {
  const {getQueueOwner} = useQueueProvider();
  const queueOwner: string = getQueueOwner();

  return (
    <>
      {queueOwner && (
        <MenuItem>
          <Grid container direction="row" spacing={1}>
            <Grid item>
              <QueueMusic/> 
            </Grid>
            <Grid item>
              {queueOwner}'s Queue
            </Grid>
          </Grid>
        </MenuItem>
      )}
      <MenuItem onClick={() => setOpen(true)}>
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <Cameraswitch/> 
          </Grid>
          <Grid item>
            Connect to Queue
          </Grid>
        </Grid>
      </MenuItem> 
    </>
  )
}

export default QueueManagement
