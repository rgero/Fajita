import { Grid, Typography } from "@mui/material";

import { useQueueContext } from "@context/queue/QueueContext";

const QueuePositionMessage: React.FC<{ targetID: string }> = ({ targetID }) => {
  const { isInQueue, getCurrentVideoIndex, getVideoIndexInQueue } = useQueueContext();

  if (!isInQueue(targetID)) return null;

  const currentIndex = getCurrentVideoIndex();
  const queueIndex = getVideoIndexInQueue(targetID);
  const diff = currentIndex - queueIndex;

  if (diff === 0) {
    return (
      <Grid size={12} sx={{paddingTop: 1}}>
        <Typography align="center" color="warning" fontWeight="bold">Video already in queue.</Typography>
        <Typography align="center">It's currently playing.</Typography>
      </Grid>
    );
  }

  const tense = diff > 0 ? "was" : "is";
  const direction = diff > 0 ? "ago" : "from now";
  const count = Math.abs(diff);

  return (
    <Grid size={12} sx={{paddingTop: 1}}>
      <Typography align="center" color="warning" fontWeight="bold">Video already in queue.</Typography>
      <Typography align="center">
        {`It ${tense} ${count} video${count === 1 ? "" : "s"} ${direction}.`}
      </Typography>
    </Grid>
  );
};


export default QueuePositionMessage;