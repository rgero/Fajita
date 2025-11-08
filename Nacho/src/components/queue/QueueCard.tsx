import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { useEffect, useState } from "react";

import GetSecretCover from '@utils/GetSecretCover';
import { Interaction } from '@interfaces/Interaction';
import QueueInfoButton from "./QueueInfoButton";
import { QueueStatus } from '@interfaces/QueueStatus';
import { Visibility } from '@interfaces/Visibility';
import { getParsedDuration } from '@utils/getParsedDuration';
import { getSecretMessage } from '@utils/SecretMessageGenerator';
import { useModalContext } from "@context/modal/ModalContext";
import { useQueueContext } from '@context/queue/QueueContext';
import { useTheme } from '@mui/material/styles';

interface Props {
  data: Interaction
  current: number
}

const QueueCard: React.FC<Props> = ({data, current}) => {
  const theme = useTheme();
  const {setCurrentlySelected, searchTerm} = useQueueContext();
  const {toggleQueueInfoModalOpen} = useModalContext();
  const [status, setIsVisible] = useState<QueueStatus>({isVisible: false, message: "", cover: ""});

  const {first_name} = data.user;
  const {title, thumbnail, duration} = data.video

  const backgroundColor = () => {
    if (data.index == current)
    {
      return theme.palette.info.main
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
      position: 'relative',
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

  const setActiveAndToggle = () => {
    setCurrentlySelected(data)
    toggleQueueInfoModalOpen();
  }

  useEffect(() => {
    const shouldBeVisible: boolean = data.visibility != Visibility.Hidden && data.visibility != Visibility.Random || data.index <= current;
    const response: QueueStatus = {isVisible: shouldBeVisible, message: null, cover: null}
    if (!shouldBeVisible)
    {
      response["message"] = getSecretMessage();
      response["cover"] = GetSecretCover(response);
    }
    setIsVisible(response);
  }, [data, current])

  return (
    <Card sx={styles.cardStyle}>
      <QueueInfoButton interaction={data} disableHanded={true} smallButton={true}/>
      <CardActionArea sx={{display: 'flex'}} onClick={setActiveAndToggle}>
        <CardMedia
          component="img"
          sx={{
            width: {xs: 120, md: 300},
            height: {xs: 90, md: 180},
            objectFit: "cover",
            flexShrink: 0
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
  )
}

export default QueueCard
