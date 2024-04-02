import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { useEffect, useState } from "react";

import { Interaction } from "../../interfaces/Interaction";
import QueueInfoModal from "./modals/QueueInfoModal";
import { QueueStatus } from "../../interfaces/QueueStatus";
import { getSecretMessage } from "../../utils/SecretMessageGenerator";
import toast from "react-hot-toast";
import { useSocket } from "../../hooks/useWebSocket";
import { useTheme } from '@mui/material/styles';

interface Props {
  data: Interaction
  current: number
}

const QueueCard: React.FC<Props> = ({data, current}) => {
  const socket = useSocket();
  const theme = useTheme();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [status, setIsVisible] = useState<QueueStatus>({isVisible: true, message: ""});


  const {first_name} = data.user;
  const {title, thumbnail} = data.video

  useEffect(() => {
    const shouldBeVisible: boolean = (data.visibility != 0) || data.index <= current;
    const response: QueueStatus = {isVisible: shouldBeVisible, message: null}
    if (!shouldBeVisible)
    {
      response["message"] = getSecretMessage();
    }
    setIsVisible(response);
  }, [data, current])

  const handleClose = () => {
    setModalOpen(false);
  }

  const jumpQueue = () => {
    const videoIndex = data.id;
    socket.emit("set_player_index", videoIndex)
    setModalOpen(false);
    toast.success("Jumping to Video")
  }


  const cardStyle = {
    width:"100%", 
    backgroundColor: `${data.index == current ? `${theme.palette.info.dark}` : ""}`,
    color: `${data.index == current ? `${theme.palette.primary.contrastText}` : ""}`,
  }
  
  return (
    <>
      <QueueInfoModal open={isModalOpen} status={status} interaction={data} closeFn={handleClose} submitFn={jumpQueue}/>
      <Card sx={cardStyle}>
        <CardActionArea sx={{display: 'flex'}} onClick={() => setModalOpen( () => true )}>
          <CardMedia
            component="img"
            sx={{
              width: {xs: 120, md: 300},
            }}
            image={`${status.isVisible ? thumbnail : '/BlackBox.png'}`}
            alt={title}
          />
          <CardContent sx={{flexGrow: 1, maxWidth: {xs:"70%", md: "55%"}}}>
            <Typography noWrap variant="subtitle2">{status.isVisible ? title : status.message}</Typography>
            <Typography variant="subtitle2">Added by {first_name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>

  )
}

export default QueueCard
