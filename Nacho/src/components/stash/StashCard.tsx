import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Share, YouTube } from "@mui/icons-material";

import AddToQueueModal from "../modals/AddToQueueModal";
import { Artifact } from "../../interfaces/Artifact";
import Button from "../ui/Button";
import InfoOverlayButton from "../info_button/InfoOverlayButton";
import { OpenYouTubeURL } from "../../utils/OpenYoutubeURL";
import { copyToClipboard } from "../../utils/CopyToClipboard";
import { getParsedDuration } from "../../utils/getParsedDuration";
import { useSettings } from "../../context/SettingsContext";
import { useState } from "react";

interface Props {
  data: Artifact;
}

const StashCard: React.FC<Props> = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {shareOptions, isRightHanded} = useSettings();
   
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


  return (
    <>
      <AddToQueueModal open={isModalOpen} videoData={{id: data.video.video_id, title: title, duration: duration, thumbnail_src: thumbnail}} closeFn={() => setModalOpen(false)}>
        {shareOptions.clipboard ? (
          <Grid item>
            <Button onClick={()=> copyToClipboard(data)} icon={(<Share/>)} title="Copy"/>
          </Grid>
        ) : null }
        {shareOptions.youtube ? (
          <Grid item>
            <Button onClick={() => OpenYouTubeURL(data.video.video_id)} icon={(<YouTube color="error"/>)} title="YouTube"/>
          </Grid>   
        ) : null }
      </AddToQueueModal>
      <Card sx={styles.card}>
        <InfoOverlayButton youtubeId={data.video.video_id}/>
        <CardActionArea onClick={() => setModalOpen( () => true )}>
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
    </>
  );
};

export default StashCard;
