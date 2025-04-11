import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { useEffect, useState } from "react";

import GetSecretCover from "../../utils/GetSecretCover";
import { Interaction } from "../../interfaces/Interaction";
import QueueInfoModal from "../modals/QueueInfoModal";
import { QueueStatus } from "../../interfaces/QueueStatus";
import { Visibility } from "../../interfaces/Visibility";
import { getParsedDuration } from "../../utils/getParsedDuration";
import { getSecretMessage } from "../../utils/SecretMessageGenerator";
import { useQueueProvider } from "../../context/QueueContext";
import { useTheme } from '@mui/material/styles';

interface Props {
  data: Interaction
  current: number
}

const QueueCard: React.FC<Props> = ({data, current}) => {
  const theme = useTheme();
  const {searchTerm} = useQueueProvider();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [status, setIsVisible] = useState<QueueStatus>({isVisible: false, message: "", cover: ""});

  const {first_name} = data.user;
  const {title, thumbnail, duration} = data.video

  const backgroundColor = () => {
    if (data.index == current)
    {
      return theme.palette.info.dark
    }   
    return "";
  }

  const shouldFilter = () => {
    if (!searchTerm) return false;
    if (data.index == current) return false;
    if (searchTerm && !title.toLowerCase().includes(searchTerm.toLowerCase())) return true;
  }

  const styles = {
    cardStyle: {
      width:"100%", 
      backgroundColor: backgroundColor,
      color: `${data.index == current ? `${theme.palette.primary.contrastText}` : ""}`,
      filter: shouldFilter() ? 'brightness(25%)' : 'none',
      transition: "background-color 0.3s ease, filter 0.3s ease"
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
    const shouldBeVisible: boolean = (data.visibility === Visibility.Hidden || data.visibility === Visibility.Random) || data.index <= current;
    const response: QueueStatus = {isVisible: shouldBeVisible, message: null, cover: null}
    if (!shouldBeVisible)
    {
      response["message"] = getSecretMessage();
      response["cover"] = GetSecretCover(response);
    }
    setIsVisible(response);
  }, [data, current])

  const handleClose = () => {
    setModalOpen(false);
  }

  return (
    <>
      <QueueInfoModal open={isModalOpen} status={status} interaction={data} closeFn={handleClose}/>
      <Card sx={styles.cardStyle}>
        <CardActionArea sx={{display: 'flex'}} onClick={() => setModalOpen( () => true )}>
          <CardMedia
            component="img"
            sx={{
              width: {xs: 120, md: 300},

            }}
            image={`${status.isVisible ? thumbnail : status.cover}`}
            alt={`${status.isVisible ? title : "Hidden"}`}
          />
          {status.isVisible && (<Typography sx={styles.overlay} variant="caption">{getParsedDuration(duration)}</Typography>)}
          <CardContent sx={{flexGrow: 1, minWidth: {xs:"70%", md: "55%"}}}>
            <Typography noWrap variant="subtitle2">{status.isVisible ? title : status.message}</Typography>
            <Typography variant="subtitle2">Added by {first_name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>

  )
}

export default QueueCard
