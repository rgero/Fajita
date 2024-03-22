import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

import AddToQueueModal from "./modals/AddToQueueModal"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import { addToQueue } from "../../services/apiFajita"
import { decode } from "html-entities"
import { useState } from "react"
import { useUser } from "../authentication/hooks/useUser"

interface Props {
  data: YoutubeResponse
}

const VideoCard: React.FC<Props> = ({data}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {user} = useUser();

  const handleClose = () => {
    setModalOpen(false);
  }

  const sendToQueue = (playNext: boolean) => {
    setModalOpen(false);
    addToQueue(user?.id as number, data.id.videoId, playNext);
  }

  const title: string = decode(data.snippet.title);
  const thumbnail: string = data.snippet.thumbnails.high.url;
  const channelTitle: string = decode(data.snippet.channelTitle);
  return (
    <>
      <AddToQueueModal open={isModalOpen} videoData={data} closeFn={handleClose} submitFn={sendToQueue}/>
      <Card>
        <CardActionArea onClick={()=>setModalOpen(() => true)}>
          <CardMedia
            sx={{height: {xs: 220, md: 300}}}
            image={thumbnail} 
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {channelTitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default VideoCard
