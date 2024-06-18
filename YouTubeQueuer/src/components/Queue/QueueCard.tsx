import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { useEffect, useState } from "react";

import { Interaction } from "../../interfaces/Interaction";
import QueueInfoModal from "./modals/QueueInfoModal";
import { QueueStatus } from "../../interfaces/QueueStatus";
import { getSecretMessage } from "../../utils/SecretMessageGenerator";
import toast from "react-hot-toast";
import { useDeleteInteraction } from "./hooks/useDeleteInteraction";
import { useSocket } from "../../hooks/useWebSocket";
import { useTheme } from '@mui/material/styles';
import GetSecretCover from "../../utils/GetSecretCover";

interface Props {
  data: Interaction
  current: number
}

const QueueCard: React.FC<Props> = ({data, current}) => {
  const socket = useSocket();
  const theme = useTheme();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [status, setIsVisible] = useState<QueueStatus>({isVisible: true, message: ""});
  const {deleteInteraction} = useDeleteInteraction();


  const {first_name} = data.user;
  const {title, thumbnail, duration} = data.video

  const parsedDuration = `${Math.floor(duration/60)}:${String(duration%60).padStart(2, '0')}`

  const styles = {
    cardStyle: {
      width:"100%", 
      backgroundColor: `${data.index == current ? `${theme.palette.info.dark}` : ""}`,
      color: `${data.index == current ? `${theme.palette.primary.contrastText}` : ""}`,
    },
    overlay: {
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      color: 'white',
      backgroundColor: 'black',
      fontWeight: 'bold',
      paddingX: '10px',
      paddingTop: "3px",
      borderRadius: 10
    }
  }

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

  const handleDelete = () => {
    if (data.index == current)
    {
      toast.error("Cannot delete current video");
    } else {
      deleteInteraction(data.id);
    }
    setModalOpen(false);
  }

  const jumpQueue = () => {
    const videoIndex = data.id;
    socket.emit("set_player_index", videoIndex)
    setModalOpen(false);
    toast.success("Jumping to Video")
  }



  return (
    <>
      <QueueInfoModal open={isModalOpen} status={status} interaction={data} deleteFn={handleDelete} closeFn={handleClose} submitFn={jumpQueue}/>
      <Card sx={styles.cardStyle}>
        <CardActionArea sx={{display: 'flex'}} onClick={() => setModalOpen( () => true )}>
          <CardMedia
            component="img"
            sx={{
              width: {xs: 120, md: 300},
            }}
            image={`${status.isVisible ? thumbnail : GetSecretCover(status)}`}
            alt={title}
          />
          <Typography sx={styles.overlay} variant="caption">{parsedDuration}</Typography>
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
