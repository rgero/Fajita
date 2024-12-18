import { Grid, LinearProgress, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import BlankCard from "./BlankCard";
import { Interaction } from "../../interfaces/Interaction";
import Spinner from "../ui/Spinner";
import { useQueueProvider } from "../../context/QueueContext";
import { useSocketProvider } from "../../context/WebSocketContext";

interface ProgressResponse {
  queue_id: number,
  progress: number
}

const FooterCard = () => {
  const {socket} = useSocketProvider();
  const {isLoading, queueData} = useQueueProvider();
  const [currentProgress, setProgress] = useState<number>(0);

  const processProgress = useCallback( (progressResponse: ProgressResponse) => {
    if (progressResponse.queue_id == queueData.id)
    {
      setProgress(progressResponse.progress);
    }
  }, [queueData])

  useEffect(() => {
    if (!socket) return;
    socket.on("player_progress", processProgress);
    return () => {
      socket.off("player_progress", processProgress);
    };
  }, [socket, processProgress]);

  if (isLoading)
  {
    return (<Spinner/>)
  }

  // If we have nothing in the queue
  if (queueData.interactions.length === 0)
  {
    return (<BlankCard/>)
  }

  const title: string =  queueData.current_interaction.video.title;
  const imageURL: string = queueData.current_interaction.video.thumbnail;
  const targetUser: string = queueData.current_interaction.user.first_name;
  const duration: number = queueData.current_interaction.video.duration;

  const currentIndex = queueData.interactions.findIndex((option: Interaction) => option.index === queueData.current_index) + 1;
  const total = queueData.interactions.length;

  return (
    <Grid container justifyContent="center" spacing={5}>
      <Grid item xs={4} md="auto">
        <img src={imageURL} alt={title} style={{maxHeight:"6rem", objectFit: "contain"}} />
      </Grid>
      <Grid item xs={8} md={6}>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>Currently Playing</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{currentIndex} / {total}</Typography>
            </Grid>
          </Grid>
          <Grid container direction="column" spacing={0.25}>
            <Grid item>
              <Typography variant="subtitle2">{title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">Added by {targetUser}</Typography>
            </Grid>
            <Grid item>
              <LinearProgress variant="determinate" value={Math.round(currentProgress/duration*100)} />
            </Grid>
          </Grid>
      </Grid>
    </Grid>
  )
}

export default FooterCard
