import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { UserResponse, useUser } from "../authentication/hooks/useUser"

import AddToQueueModal from "./modals/AddToQueueModal"
import ModalCard from "./modals/ModalCard"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import { addToQueue } from "../../services/apiFajita"
import { decode } from "html-entities"
import { useState } from "react"

interface Props {
  data: YoutubeResponse
}

const styles = {
  card: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'white',
    backgroundColor: 'black',
    fontWeight: 'bold',
    paddingX: '10px',
    paddingY: "3px",
    borderRadius: 10
  }
}

const VideoCard: React.FC<Props> = ({data}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {user}: UserResponse = useUser();

  const handleClose = () => {
    setModalOpen(false);
  }

  const sendToQueue = (playNext: boolean, visibility: number) => {
    setModalOpen(false);
    addToQueue(user?.id as number, data.id, playNext, visibility);
  }

  return (
    <>
      <AddToQueueModal open={isModalOpen} videoData={data} closeFn={handleClose} submitFn={sendToQueue}/>
      <Card sx={styles.card}>
        <ModalCard data={data} clickFn={() => setModalOpen( ()=> true )}/> 
      </Card>
    </>
  )
}

export default VideoCard
