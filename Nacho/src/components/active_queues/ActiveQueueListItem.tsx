import { Avatar, Grid, Typography } from '@mui/material';

import { EmojiPeople } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useQueueProvider } from "../../context/QueueContext"

const ActiveQueueListItem = ({id, owner, image, closeFn} : {id: string, owner: string, image: string|undefined, closeFn: () => void}) => {
  const {connectToQueue} = useQueueProvider();

  const processConnect = async () => {
    try {
      await connectToQueue(id);
      toast.success("Connected to Queue");
      closeFn();
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Failed to connect to Queue");
    }
  };
  
  return (
    <Grid item container direction="row" justifyContent="center" spacing={3} onClick={processConnect}>
      <Grid item>
        {image ? <Avatar src={image}/> : (<Avatar><EmojiPeople/></Avatar>)}
      </Grid> 
      <Grid item>
        <Typography variant="h5">
          {owner}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default ActiveQueueListItem
