import { Box, Container, Divider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { Interaction } from "../../interfaces/Interaction";
import QueueCard from "./QueueCard";
import Spinner from "../ui/Spinner";
import { useQueueProvider } from "../../context/QueueContext";

const QueueList = () => {
  const {isLoading, queueData, error} = useQueueProvider();
  const {current_index, interactions} = queueData;
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [targetIndex, setTargetIndex] = useState<number>(-1);

  const scrollToRef = useRef<HTMLElement>(null);

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
      scrollToRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [currentIndex]);

  if(isLoading) return (<Spinner/>)
  if (!interactions || interactions.length == 0)
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
    <Box> 
      {
        interactions.map( (entry: Interaction, index: number) => (
          <Box 
            sx={{
              paddingBottom: {xs: 1},
            }} 
            key={index} 
            id={`${entry.index}`}
            ref={ entry.index === targetIndex ? scrollToRef : null } 
          >
            <QueueCard current={currentIndex} data={entry} key={index}/>
            <Divider/>
          </Box>
        ))
      }
    </Box>
  )
}

export default QueueList
