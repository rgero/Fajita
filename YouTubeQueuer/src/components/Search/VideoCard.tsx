import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

import AddToQueueModal from "../QueueModal/AddToQueueModal"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import { decode } from "html-entities"
import toast from "react-hot-toast"
import { useState } from "react"

interface Props {
  data: YoutubeResponse
}

const VideoCard: React.FC<Props> = ({data}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  }

  const sendToQueue = (playNext: boolean) => {
    // Alerts are bad - mmkay
    setModalOpen(false);
    
    if(playNext)
    {
      toast.success("Song Added!");
    } else {
      toast.error("You lost a coinflip");
    }
  }

  const title: string = decode(data.snippet.title);
  const thumbnail: string = data.snippet.thumbnails.max.url;
  const channelTitle: string = decode(data.snippet.channelTitle);
  return (
    <>
      <AddToQueueModal open={isModalOpen} videoData={data} closeFn={handleClose} submitFn={sendToQueue}/>
      <Card>
        <CardMedia
          sx={{height: {xs: 220, md: 550}}}
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
        <CardActions sx={{justifyContent: "flex-end"}}>
          <Button onClick={() => setModalOpen( () => true )}>Add To Queue</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default VideoCard
