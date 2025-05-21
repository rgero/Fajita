import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material"
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

const CompactStashCard: React.FC<Props> = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {shareOptions} = useSettings();

  const {title, thumbnail, duration} = data.video

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
      <Card sx={styles.cardStyle}>
        <InfoOverlayButton youtubeId={data.video.video_id} disableHanded={true}/>
        <CardActionArea sx={{display: 'flex'}} onClick={() => setModalOpen( () => true )}>
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
    </>
  )
}

export default CompactStashCard
