import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

import { Interaction } from "../../interfaces/Interaction";
import QueueInfoModal from "./modals/QueueInfoModal";
import toast from "react-hot-toast";
import { useSocket } from "../../hooks/useWebSocket";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';

interface Props {
  data: Interaction
  isCurrent: boolean
}

const QueueCard: React.FC<Props> = ({data, isCurrent}) => {
  const socket = useSocket();
  const theme = useTheme();
  const [isModalOpen, setModalOpen] = useState(false);

  const {first_name} = data.user;
  const {title, thumbnail} = data.video

  const handleClose = () => {
    setModalOpen(false);
  }

  const jumpQueue = () => {
    const videoIndex = data.index;
    socket.emit("set_player_index", videoIndex)
    setModalOpen(false);
    toast.success("Jumping to Video")
  }
  
  return (
    <>
      <QueueInfoModal open={isModalOpen} interaction={data} closeFn={handleClose} submitFn={jumpQueue}/>
      <Card sx={{width:"100%", backgroundColor: `${isCurrent ? `${theme.palette.info.dark}` : ""}`, color: `${isCurrent ? `${theme.palette.primary.contrastText}` : ""}`}}>
        <CardActionArea sx={{display: 'flex'}} onClick={() => setModalOpen( () => true )}>
          <CardMedia
            component="img"
            sx={{width: {xs: 120, md: 300}}}
            image={thumbnail}
            alt={title}
          />
          <CardContent sx={{flexGrow: 1, maxWidth: {xs:"70%", md: "55%"}}}>
            <Typography noWrap variant="subtitle2">{title}</Typography>
            <Typography variant="subtitle2">Added by {first_name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>

  )
}

export default QueueCard
