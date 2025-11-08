import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

import { Artifact } from '@interfaces/Artifact';
import InfoOverlayButton from "../info_menus/InfoOverlayButton";
import { getParsedDuration } from '@utils/getParsedDuration';
import { useModalContext } from "@context/modal/ModalContext";
import { useSearchContext } from "@context/search/SearchContext";

interface Props {
  data: Artifact;
}

const CompactStashCard: React.FC<Props> = ({ data }) => {
  const {title, thumbnail, duration} = data.video
  const {toggleAddToQueueModalOpen} = useModalContext();
  const {setSelectedResult} = useSearchContext();

  const styles = {
    cardStyle: {
      position: 'relative',
      width:"100%",
      height: "110px",
      transition: "background-color 0.3s ease"
    },
    overlay: {
      position: 'absolute',
      bottom: '20px',
      right: '10px',
      color: 'white',
      backgroundColor: 'black',
      fontWeight: 'bold',
      paddingX: '10px',
      paddingTop: "3px",
      borderRadius: 10
    }
  }

  const processSelect = () => {
    setSelectedResult(data);
    toggleAddToQueueModalOpen();
  }


  return (
    <Card sx={styles.cardStyle}>
      <InfoOverlayButton youtubeId={data.video.video_id} disableHanded={true} smallButton={true}/>
      <CardActionArea sx={{display: 'flex'}} onClick={processSelect}>
        <CardMedia
          component="img"
          sx={{
            width: 150,
            height: "100%",
            objectFit: "cover",
          }}
          image={thumbnail}
          alt={title}
        />
        <Typography sx={styles.overlay} variant="caption">{getParsedDuration(duration)}</Typography>
        <CardContent sx={{flexGrow: 1, minWidth: {xs:"70%", md: "55%"}, marginBottom: "15px"}}>
          <Typography noWrap variant="subtitle2">{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CompactStashCard
