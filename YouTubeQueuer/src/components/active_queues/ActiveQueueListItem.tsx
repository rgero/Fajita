import { Avatar, Grid, Typography } from '@mui/material';

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { useQueueProvider } from "../../context/QueueContext"

const ActiveQueueListItem = ({id, owner, image, closeFn} : {id: number, owner: string, image: string|undefined, closeFn: () => void}) => {
  const {connectToQueue} = useQueueProvider();

  const processConnect = () => {
    connectToQueue(id);
    closeFn();
  }

  return (
    <Grid item container direction="row" justifyContent="center" spacing={3} onClick={processConnect}>
      <Grid item>
        {image ? <Avatar src={image}/> : (<Avatar><EmojiPeopleIcon/></Avatar>)}
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
