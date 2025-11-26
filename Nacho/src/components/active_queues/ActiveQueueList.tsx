import ActiveQueueListItem from "./ActiveQueueListItem";
import Empty from "../ui/Empty";
import { Grid } from "@mui/material";
import Spinner from "../ui/Spinner";
import { useActiveQueues } from "./hooks/useActiveQueues"

const ActiveQueueList = ({closeFn} : {closeFn: () => void}) => {

  const {isLoading, queues} = useActiveQueues();

  if (isLoading)
  {
    return <Spinner/>
  }

  if (!queues || queues?.length == 0) return <Empty resource={"Active Queues"}/>

  return (
    <Grid container direction="column" spacing={2} paddingTop={3}>
      {queues.map( (queue) => {
        return (
          <ActiveQueueListItem key={queue.id} owner={queue.owner.first_name} id={queue.id} image={queue.owner.picture} closeFn={closeFn}/>
        )
      })}
    </Grid>
  )
}

export default ActiveQueueList
