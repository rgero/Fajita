import { Grid, Typography } from "@mui/material";
import { YouTubeQueueResponse, useYouTubeQueue } from "../../hooks/useYouTubeQueue";
import { useCallback, useEffect, useState } from "react";

import { Interaction } from "../../interfaces/Interaction";
import Spinner from "../ui/Spinner";
import { useSocket } from "../../hooks/useWebSocket";

const FooterCard = () => {
  const socket = useSocket();
  const {isLoading, queueData, refetch} : YouTubeQueueResponse = useYouTubeQueue();
  const [currentlyPlaying, setCurrentPlay] = useState<Interaction|null>(null);
  const [currentIndex, setCurrentIndex] = useState<number|null>(null);
  const [total, setTotal] = useState<number|null>(null);

  const onMessage = useCallback( async () => {
    refetch();
  }, []);

  useEffect(() => {
    socket.on("player_status", onMessage);
    socket.on("new_video_interaction", onMessage);
    return () => {
      socket.off("player_status", onMessage);
      socket.off("new_video_interaction", onMessage);
    };
  }, [socket, onMessage]);

  useEffect(() => {
    if (Object.keys(queueData).length === 0) return;
    const currentIndex = queueData.current_index;
    const foundItems = queueData.interactions.filter((option: Interaction) =>{
      return option.index == currentIndex;
    })
    
    if (foundItems.length == 1)
    {
      setCurrentPlay( () => foundItems[0]);
      setCurrentIndex( () => queueData.interactions.sort((A:Interaction, B:Interaction) => { return A.index - B.index }).indexOf(foundItems[0]) + 1 );
      setTotal( () => queueData.interactions.length );
    }
  }, [queueData, currentIndex, total])


  if (isLoading)
  {
    return (<Spinner/>)
  }

  // If we have nothing
  if (!currentlyPlaying || Object.keys(currentlyPlaying).length === 0)
  {
    return (
      <Grid container justifyContent="center">
        <Grid item>
          <Typography>Nothing Playing</Typography>
        </Grid>
      </Grid>

    )
  }

  const title: string =  currentlyPlaying.video.title;
  const imageURL: string = currentlyPlaying.video.thumbnail;
  const targetUser: string = currentlyPlaying.user.first_name;

  return (
    <Grid container justifyContent="center" spacing={{md: 2}}>
      <Grid item xs={4} md="auto">
        <img className="image-contain max-h-24" src={imageURL} alt={title}/>
      </Grid>
      <Grid item xs={8} md="auto">
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>Currently Playing</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{currentIndex} / {total}</Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="subtitle2">Added by {targetUser}</Typography>
      </Grid>
    </Grid>
  )
}

export default FooterCard
