import { Box, Container, Divider, Typography } from "@mui/material";

import { Interaction } from "../../interfaces/Interaction";
import QueueCard from "./QueueCard";
import Spinner from "../ui/Spinner";
import { useYouTubeQueue } from "./hooks/useYouTubeQueue"

const QueueList = () => {
  const {isLoading, queueData, error} = useYouTubeQueue();
  const {interactions} = queueData;

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
            <Box sx={{paddingBottom: {xs: 2}}} key={index}>
              <QueueCard data={entry} key={index}/>
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
