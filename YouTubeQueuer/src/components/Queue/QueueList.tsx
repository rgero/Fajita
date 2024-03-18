import { Box, Container } from "@mui/material";

import { Interaction } from "../../interfaces/Interaction";
import QueueCard from "./QueueCard";
import Spinner from "../ui/Spinner";
import { useYouTubeQueue } from "./hooks/useYouTubeQueue"

const QueueList = () => {
  const {isLoading, queueData, error} = useYouTubeQueue();
  const {interactions} = queueData;

  return (
    <>
    {isLoading ? <Spinner/> : (
      <Container> 
        {
          interactions.map( (entry: Interaction, index: number) => (
            <Box sx={{paddingBottom: {xs: 2}}}>
              <QueueCard data={entry} key={index}/>
            </Box>
          ))
        }
      </Container>
    )}
  </>
  )
}

export default QueueList
