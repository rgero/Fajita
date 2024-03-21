import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

import { Interaction } from "../../interfaces/Interaction";
import QueueInfoModal from "./modals/QueueInfoModal";
import toast from "react-hot-toast";
import { useState } from "react";

interface Props {
  data: Interaction
}

const QueueCard: React.FC<Props> = ({data}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const {first_name} = data.user;
  const {title, thumbnail} = data.video

  const handleClose = () => {
    setModalOpen(false);
  }

  const jumpQueue = (targetID: number) => {
    console.log(targetID);
    setModalOpen(false);
  }
  const copyToClipboard = async () => {
    const targetURL = `https://www.youtube.com/watch?v=${data.video.video_id}`
    await navigator.clipboard.writeText(targetURL).then(
      ()=> {    
        toast.success("Link Copied");
        setModalOpen(false);
      },
      () => {
        toast.error("Error");
        setModalOpen(false);
        alert("Error. Why though?")
      }
    )

  }
  
  return (
    <>
      <QueueInfoModal open={isModalOpen} interaction={data} closeFn={handleClose} copyFn={copyToClipboard} submitFn={jumpQueue}/>
      <Card>
        <CardActionArea sx={{display: 'flex'}} onClick={() => setModalOpen( () => true )}>
          <CardMedia
            component="img"
            sx={{width: {xs: 120, md: 300}}}
            image={thumbnail}
            alt={title}
          />
          <CardContent>
            <Typography variant="subtitle2">{title}</Typography>
            <Typography variant="subtitle2">Added by {first_name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>

  )
}

export default QueueCard
