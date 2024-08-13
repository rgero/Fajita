import { Avatar, Grid, Typography } from '@mui/material';

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { useNavigate } from "react-router-dom";
import { useQueueProvider } from "../../context/QueueContext"

const ActiveQueueListItem = ({id, owner, image} : {id: number, owner: string, image: string|undefined}) => {
  const {connectToQueue} = useQueueProvider();
  const navigate = useNavigate();

  const processConnect = () => {
    connectToQueue(id);
    navigate("/");
  }

  return (
    <Grid item container direction="row" justifyContent="flex-start" spacing={3} onClick={processConnect}>
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
