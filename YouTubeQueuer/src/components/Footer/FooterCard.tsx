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
  const [currentlyPlaying, setCurrentPlay] = useState<Interaction|null>(null);
  const [currentIndex, setCurrentIndex] = useState<number|null>(null);
  const [total, setTotal] = useState<number|null>(null);
  const [currentProgress, setProgress] = useState<number>(0);
  const [queueID, setQueueID] = useState<number>(0);

  const processProgress = useCallback( (progressResponse: ProgressResponse) => {
    if (progressResponse.queue_id == queueData.id)
    {
      setProgress(progressResponse.progress);
    }
  }, [queueID])

  useEffect(() => {
    if (!socket) return;
    socket.on("player_progress", processProgress);
    return () => {
      socket.off("player_progress", processProgress);
    };
  }, [socket, processProgress]);

  useEffect(() => {
    if (Object.keys(queueData).length === 0) return;
    const currentIndex = queueData.current_index;
    const foundItems = queueData.interactions.filter((option: Interaction) =>{
      return option.index == currentIndex;
    })
    
    if (foundItems.length == 1)
    {
      setCurrentPlay( () => foundItems[0]);
      setCurrentIndex( () => queueData.interactions.indexOf(foundItems[0]) + 1 );
      setTotal( () => queueData.interactions.length );
      setQueueID( () => queueData.id );
    }
  }, [queueData, currentIndex, total])

  if (isLoading)
  {
    return (<Spinner/>)
  }

  // If we have nothing in the queue
  if (!currentlyPlaying || Object.keys(currentlyPlaying).length === 0)
  {
    return (<BlankCard/>)
  }

  const title: string =  currentlyPlaying.video.title;
  const imageURL: string = currentlyPlaying.video.thumbnail;
  const targetUser: string = currentlyPlaying.user.first_name;
  const duration: number = currentlyPlaying.video.duration;

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
