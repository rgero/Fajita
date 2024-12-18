import AddToQueueModal from "./modals/AddToQueueModal"
import { Card } from "@mui/material"
import ModalCard from "../ui/VideoCard"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
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

  const handleClose = () => {
    setModalOpen(false);
  }

  return (
    <>
      <AddToQueueModal open={isModalOpen} videoData={data} closeFn={handleClose}/>
      <Card sx={styles.card}>
        <ModalCard data={data} clickFn={() => setModalOpen( ()=> true )}/> 
      </Card>
    </>
  )
}

export default VideoCard
