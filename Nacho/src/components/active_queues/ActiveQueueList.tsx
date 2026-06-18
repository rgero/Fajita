import ActiveQueueListItem from "./ActiveQueueListItem";
import Empty from "../ui/Empty";
import { Stack } from "@mui/material";
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
    <Stack spacing={2} sx={{ paddingTop: 3 }}>
      {queues.map( (queue) => {
        return (
          <ActiveQueueListItem key={queue.id} owner={queue.owner.first_name} id={queue.id} image={queue.owner.picture} closeFn={closeFn}/>
        )
      })}
    </Stack>
  )
}

export default ActiveQueueList
