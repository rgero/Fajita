import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

import { Artifact } from '@interfaces/Artifact';
import InfoOverlayButton from "../info_menus/InfoOverlayButton";
import { getParsedDuration } from '@utils/getParsedDuration';
import { useModalContext } from "@context/modal/ModalContext";
import { useSearchContext } from "@context/search/SearchContext";
import { useSettings } from '@context/settings/SettingsContext';

interface Props {
  data: Artifact;
}

const StashCard: React.FC<Props> = ({ data }) => {
  const {isRightHanded} = useSettings();
  const {toggleAddToQueueModalOpen} = useModalContext();
  const {setSelectedResult} = useSearchContext();
   
  const {title, thumbnail, duration} = data.video;

  
  const styles = {
    card: {
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: '10px',
      right: isRightHanded ? null : "10px",
      left: isRightHanded ? "10px" : null,
      color: 'white',
      backgroundColor: 'black',
      fontWeight: 'bold',
      paddingX: '10px',
      paddingTop: "3px",
      borderRadius: 10
    }
  };

  const processSelect = () => {
    setSelectedResult(data);
    toggleAddToQueueModalOpen();
  }


  return (
    <Card sx={styles.card}>
      <InfoOverlayButton youtubeId={data.video.video_id}/>
      <CardActionArea onClick={processSelect}>
        <CardMedia
          component="img"
          sx={{
            height: {xs: 220, md: 300},
            objectFit: "cover",
          }}
          image={thumbnail}
          title={title}
          alt={title}
        />
        <Typography sx={styles.overlay} variant="caption">{getParsedDuration(duration)}</Typography>
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div" sx={{wordBreak: "break-word"}}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default StashCard;
