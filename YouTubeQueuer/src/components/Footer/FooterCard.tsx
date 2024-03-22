import { Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { Interaction } from "../../interfaces/Interaction";
import Spinner from "../ui/Spinner";
import { useSocket } from "../../hooks/useWebSocket";
import { useYouTubeQueue } from "../../hooks/useYouTubeQueue";

const FooterCard = () => {
  const socket = useSocket();
  const {isLoading, queueData, refetch} = useYouTubeQueue();
  const [currentlyPlaying, setCurrentPlay] = useState<Interaction|null>(null);

  const onMessage = useCallback( async () => {
    refetch();
  }, []);

  useEffect(() => {
    socket.on("player_status", onMessage);
    return () => {
      socket.off("player_status", onMessage);
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
    }
  }, [queueData])


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
        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>Currently Playing</Typography>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="subtitle2">Added by {targetUser}</Typography>
      </Grid>
    </Grid>
  )
}

export default FooterCard
