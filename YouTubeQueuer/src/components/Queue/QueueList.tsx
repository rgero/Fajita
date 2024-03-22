import { Box, Container, Divider, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { Interaction } from "../../interfaces/Interaction";
import QueueCard from "./QueueCard";
import Spinner from "../ui/Spinner";
import { useSocket } from "../../hooks/useWebSocket";
import { useYouTubeQueue } from "../../hooks/useYouTubeQueue"

type Message = {
  current_index: number,
  player_state: string,
  player_state_int: number
}

const QueueList = () => {
  const socket = useSocket();
  const {isLoading, queueData, error, refetch} = useYouTubeQueue();
  const {current_index, interactions} = queueData;
  const [currentIndex, setCurrentIndex] = useState<number>(current_index);

  const onMessage = useCallback( async (message: Message) => {
    console.log(message);
    setCurrentIndex( () => message.current_index)
  }, []);

  const onNewVideo = useCallback( async () => {
    refetch();
  }, []);

  useEffect(() => {
    socket.on("player_status", onMessage);
    socket.on("new_video_interaction", onNewVideo);

    return () => {
      socket.off("player_status", onMessage);
      socket.off("new_video_interaction", onNewVideo);
    };
  }, [socket, onMessage]);

  useEffect(()=> {
    setCurrentIndex( () => current_index)
  }, [current_index]);

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
    <>
    {isLoading ? <Spinner/> : (
      <Container> 
        {
          interactions.map( (entry: Interaction, index: number) => (
            <Box sx={{paddingBottom: {xs: 1}}} key={index}>
              <QueueCard isCurrent={currentIndex == entry.index} data={entry} key={index}/>
              <Divider/>
            </Box>
          ))
        }
      </Container>
    )}
  </>
  )
}

export default QueueList
