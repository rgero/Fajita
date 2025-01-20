import { Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material"
import { Favorite, Share, YouTube } from "@mui/icons-material";

import AddToQueueModal from "../Search/modals/AddToQueueModal";
import { Artifact } from "../../interfaces/Artifact";
import Button from "../ui/Button";
import { OpenYouTubeURL } from "../../utils/OpenYoutubeURL";
import { copyToClipboard } from "../../utils/CopyToClipboard";
import toast from "react-hot-toast";
import { useSettings } from "../../context/SettingsContext";
import { useStashProvider } from "../../context/StashContext";
import { useState } from "react";

interface Props {
  data: Artifact;
}

const CompactStashCard: React.FC<Props> = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {shareOptions} = useSettings();
  const {deleteVideoFromStash} = useStashProvider();  

  const {title, thumbnail, duration} = data.video
  const parsedDuration = `${Math.floor(duration/60)}:${String(duration%60).padStart(2, '0')}`

  const handleRemoveFromStash = async () => {
    try {
      await deleteVideoFromStash(data.video.video_id);
      toast.success("Video removed from stash");
    } catch (err: any) {
      toast.error("Failed to remove video from stash");
    }
  }

  const styles = {
    cardStyle: {
      position: 'relative',
      width:"100%",
      transition: "background-color 0.3s ease"
    },
    overlayButton: {
      position: "absolute",
      top: "10px",
      left: "10px",
      zIndex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
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


  return (
    <>
      <AddToQueueModal open={isModalOpen} videoData={{id: data.video.video_id, title: title, duration: parsedDuration, thumbnail_src: thumbnail}} closeFn={() => setModalOpen(false)}>
        {shareOptions.clipboard ? (
          <Grid item>
            <Button onClick={()=> copyToClipboard(data)} icon={(<Share/>)} title="Copy"/>
          </Grid>
        ) : null }
        {shareOptions.youtube ? (
          <Grid item>
            <Button onClick={() => OpenYouTubeURL(data)} icon={(<YouTube color="error"/>)} title="YouTube"/>
          </Grid>   
        ) : null }
      </AddToQueueModal>
      <Card sx={styles.cardStyle}>
        <IconButton
          sx={styles.overlayButton}
          onClick={handleRemoveFromStash}
          aria-label="Remove from Stash"
          size="small"
        >
          <Favorite color="error" />
        </IconButton>
        <CardActionArea sx={{display: 'flex'}} onClick={() => setModalOpen( () => true )}>
          <CardMedia
            component="img"
            sx={{
              width: {xs: 120, md: 300},
              height: "100%",
              objectFit: "cover",
            }}
            image={thumbnail}
            alt={title}
          />
          <Typography sx={styles.overlay} variant="caption">{parsedDuration}</Typography>
          <CardContent sx={{flexGrow: 1, maxWidth: {xs:"70%", md: "55%"}}}>
            <Typography noWrap variant="subtitle2">{title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default CompactStashCard
