import { Box, Container, Divider, Typography } from "@mui/material";
import { YouTubeQueueResponse, useYouTubeQueue } from "../../hooks/useYouTubeQueue"
import { useCallback, useEffect, useRef, useState } from "react";

import { Interaction } from "../../interfaces/Interaction";
import QueueCard from "./QueueCard";
import Spinner from "../ui/Spinner";
import { useSocket } from "../../hooks/useWebSocket";

const QueueList = () => {
  const socket = useSocket();
  const {isLoading, queueData, error, refetch}: YouTubeQueueResponse = useYouTubeQueue();
  const {current_index, interactions} = queueData;
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [targetIndex, setTargetIndex] = useState<number>(-1);

  const scrollToRef = useRef<HTMLElement>(null);

    // This is for video Interactions
  const processChanges = useCallback( async () => {
    refetch();
  }, [refetch]);
  
  useEffect(() => {
    socket.on("new_video_interaction", processChanges);
    socket.on("video_deleted", processChanges);
    return () => {
      socket.off("new_video_interaction", processChanges);
      socket.off("video_deleted", processChanges);
    };
  }, [socket, processChanges]);

  // This is for setting the current Index and scrolling
  useEffect(()=> { 
    const calculateTargetIndex = () => {
      if (Object.keys(queueData).length === 0) return;
      const currentIndex:number = queueData.current_index;
      const foundItems:Interaction[] = queueData.interactions.filter((option: Interaction) =>{
        return option.index == currentIndex;
      })
      
      if (foundItems.length == 1)
      {
        const tIndex: number = queueData.interactions.indexOf(foundItems[0]) - 1;
        const target: Interaction = queueData.interactions[tIndex];
        if (target == undefined) return;
        setTargetIndex( () => queueData.interactions[tIndex].index );
      }
    }

    setCurrentIndex( () => current_index);
    calculateTargetIndex();
  }, [queueData, current_index]);


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
            ref={ entry.index === targetIndex ? scrollToRef : null } 
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
