import { Box, Button, Stack, Typography } from "@mui/material";

import ActiveQueueListItem from "./ActiveQueueListItem";
import Spinner from "../ui/Spinner";
import { useActiveQueues } from "./hooks/useActiveQueues"

const ActiveQueueList = ({closeFn} : {closeFn: () => void}) => {

  const {isLoading, queues} = useActiveQueues();

  if (isLoading)
  {
    return <Spinner/>
  }

  if (!queues || queues?.length == 0) return (
    <Stack spacing={4}>
      <Box
        data-testid="empty"
        sx={{
          minHeight: 120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 2,
          px: 2,
          py: 3,
          color: 'text.secondary',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          No active queues
        </Typography>
        <Typography variant="caption" sx={{ mt: 0.5 }}>
          Check back later.
        </Typography>
      </Box>
      <Box sx={{justifyContent: "flex-end", display: "flex", width: "100%"}}>
        <Button variant="outlined"
          onClick={closeFn}
        >
          Close
        </Button>
      </Box>
    </Stack>
  );

  const sortedQueues = [...queues].sort((a, b) => {
    if (a.locked !== b.locked) {
      return a.locked ? 1 : -1;
    }

    return (a.owner?.first_name ?? "").localeCompare(b.owner?.first_name ?? "", undefined, { sensitivity: "base" });
  });

  return (
    <Stack spacing={2} sx={{ paddingTop: 3 }}>
      {sortedQueues.map( (queue) => {
        return (
          <ActiveQueueListItem
            key={queue.id}
            owner={queue.owner.first_name}
            id={queue.id}
            image={queue.owner.picture}
            isLocked={queue.locked}
            closeFn={closeFn}
          />
        )
      })}
    </Stack>
  )
}

export default ActiveQueueList
