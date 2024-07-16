import { Grid } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useQueueProvider } from "../../context/QueueContext"

const ActiveQueueListItem = ({id, owner} : {id: number, owner: string}) => {
  const {connectToQueue} = useQueueProvider();
  const navigate = useNavigate();

  const processConnect = () => {
    connectToQueue(id);
    navigate("/");
  }

  return (
    <Grid item onClick={processConnect}>
      {id} - {owner}
    </Grid>
  )
}

export default ActiveQueueListItem
