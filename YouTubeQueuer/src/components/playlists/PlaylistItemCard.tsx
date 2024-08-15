import { Card, CardActionArea, CardContent, CardMedia, Typography, useTheme } from "@mui/material"
import { UserResponse, useUser } from "../authentication/hooks/useUser";

import AddToQueueModal from "../Search/modals/AddToQueueModal";
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import { addToQueue } from "../../services/apiFajita";
import { offsetHexColor } from "../../utils/HexColorOffset";
import { useQueueProvider } from "../../context/QueueContext";
import { useState } from "react";

const PlaylistCard = ({video, index} : {video: YoutubeResponse, index: number}) => {
  const theme = useTheme();
  const [isModalOpen, setModalOpen] = useState(false);

  const {user}: UserResponse = useUser();
  const {getQueueID} = useQueueProvider();

  const handleClose = () => {
    setModalOpen(false);
  }

  const sendToQueue = (playNext: boolean, visibility: number) => {
    setModalOpen(false);
    addToQueue(getQueueID(), user?.id as number, video.id, playNext, visibility);
  }

  const styles = {
    cardStyle: {
      width: "95%",
      margin: "auto",
      backgroundColor: index % 2 == 0 ? theme.palette.background.paper : offsetHexColor(theme.palette.background.paper, 20)
    }
  }
  
  return (
    <>
      <AddToQueueModal open={isModalOpen} videoData={video} closeFn={handleClose} submitFn={sendToQueue}/>
      <Card sx={styles.cardStyle}>
        <CardActionArea sx={{display: 'flex'}} onClick={() => setModalOpen( ()=> true )}>
          <CardMedia
            component="img"
            sx={{
              width: {xs: 120, md: 300},
              objectFit: "cover"
            }}
            image={video.thumbnail_src}
            alt={video.title}
          />
          <CardContent sx={{flexGrow: 1, maxWidth: {xs:"70%", md: "55%"}}}>
            <Typography noWrap variant="subtitle2">{video.title}</Typography>
            <Typography variant="subtitle2">{video.author}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>

  )
}

export default PlaylistCard
