import { Container, Grid } from "@mui/material";

import ActiveQueueListItem from "./ActiveQueueListItem";
import Empty from "../ui/Empty";
import Spinner from "../ui/Spinner";
import { useActiveQueues } from "./hooks/useActiveQueues"

const ActiveQueueList = () => {

  const {isLoading, queues} = useActiveQueues();

  if (isLoading)
  {
    return <Spinner/>
  }

  if (!queues) return <Empty resource={"Active Queues"}/>
  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        {queues.map( (queue) => {
          return (
            <ActiveQueueListItem key={queue.id} owner={queue.owner.first_name} id={queue.id} image={queue.owner.picture}/>
          )
        })}
      </Grid>
    </Container>
  )
}

export default ActiveQueueList
