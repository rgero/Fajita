import { Grid, MenuItem, Typography } from "@mui/material"

import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import { useQueueProvider } from "../../../context/QueueContext";

const QueueManagement = ({setOpen} : {setOpen : (open: boolean) => void}) => {
  const {getQueueOwner} = useQueueProvider();
  const queueOwner: string = getQueueOwner();

  return (
    <>
      {queueOwner && (
        <MenuItem>
          <Grid container direction="row" spacing={1} justifyContent="center">
            <Grid item>
              <Typography>
                {queueOwner}'s Queue
              </Typography>
            </Grid>
          </Grid>
        </MenuItem>
      )}
      <MenuItem onClick={() => setOpen(true)}>
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <CameraswitchIcon/> 
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
