import { Box, Container, Divider, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

import { Interaction } from "../../interfaces/Interaction";
import QueueCard from "./QueueCard";
import Spinner from "../ui/Spinner";
import { useSocket } from "../../hooks/useWebSocket";
import { useYouTubeQueue } from "../../hooks/useYouTubeQueue"

const QueueList = () => {
  const socket = useSocket();
  const {isLoading, queueData, error, refetch} = useYouTubeQueue();
  const {current_index, interactions} = queueData;
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const scrollToRef = useRef<HTMLElement>(null);

    // This is for video Interactions
  const onNewVideo = useCallback( async () => {
    refetch();
  }, []);
  
  useEffect(() => {
    socket.on("new_video_interaction", onNewVideo);
    return () => {
      socket.off("new_video_interaction", onNewVideo);
    };
  }, [socket]);

  // This is for setting the current Index
  useEffect(()=> { 
    setCurrentIndex( () => current_index);
  }, [queueData, currentIndex]);


  // This is for the scrolling.
  useEffect( () => {
    if( scrollToRef.current ) {
      const yOffset = -80;
      const y = scrollToRef?.current?.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }, [currentIndex]);

  if(isLoading) return (<Spinner/>)
  if (interactions.length == 0)
  {
    return (
      <Container>
        <Typography>There are no videos currently in the queue</Typography>
      </Container>
    )
  }

  if (error)
  {
    return (
      <Container>
        <Typography>An error has occurred. Oops.</Typography>
      </Container>
    )
  }

  return (
    <Container> 
      {
        interactions.map( (entry: Interaction, index: number) => (
          <Box 
            sx={{paddingBottom: {xs: 1}}} 
            key={index} 
            id={`${entry.index}`}
            ref={ entry.index === currentIndex ? scrollToRef : null } 
          >
            <QueueCard current={currentIndex} data={entry} key={index}/>
            <Divider/>
          </Box>
        ))
      }
    </Container>
  )
}

export default QueueList
