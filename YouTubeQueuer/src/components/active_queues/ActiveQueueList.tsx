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
      <Grid container direction="column">
        {queues.map( (queue) => {
          return (
            <ActiveQueueListItem owner={queue.owner.first_name} id={queue.id}/>
          )
        })}
      </Grid>
    </Container>
  )
}

export default ActiveQueueList
