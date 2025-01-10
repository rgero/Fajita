import { Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@mui/material";

import AddToQueueModal from "../Search/modals/AddToQueueModal";
import { Artifact } from "../../interfaces/Artifact";
import FavoriteIcon from "@mui/icons-material/Favorite";
import toast from "react-hot-toast";
import { useStashProvider } from "../../context/StashContext";
import { useState } from "react";

interface Props {
  data: Artifact;
}

const styles = {
  card: {
    position: 'relative',
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
    top: '10px',
    right: '10px',
    color: 'white',
    backgroundColor: 'black',
    fontWeight: 'bold',
    paddingX: '10px',
    paddingTop: "3px",
    borderRadius: 10
  }
};

const StashCard: React.FC<Props> = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {deleteVideoFromStash} = useStashProvider();
   
  const {title, thumbnail, duration} = data.video
  const parsedDuration = `${Math.floor(duration/60)}:${String(duration%60).padStart(2, '0')}`

  const handleRemoveFromStash = async () => {
    try {
      await deleteVideoFromStash(data.video.video_id);
      toast.success("Video removed from stash");
    } catch (err: any) {
      console.log(err);
      toast.error("Failed to remove video from stash");
    }
  }

  return (
    <>
      <AddToQueueModal open={isModalOpen} videoData={{id: data.video.video_id, title: title, duration: parsedDuration, thumbnail_src: thumbnail}} closeFn={() => setModalOpen(false)} />
      <Card sx={styles.card}>
        <IconButton
          sx={styles.overlayButton}
          onClick={handleRemoveFromStash}
          aria-label="Remove from Stash"
        >
          <FavoriteIcon color="error" />
        </IconButton>
        <CardActionArea onClick={() => setModalOpen( () => true )}>
          <CardMedia
            component="img"
            sx={{
              height: { xs: 220, md: 300 },
              objectFit: "cover",
              width: "100%",
            }}
            image={thumbnail}
          />
          <Typography sx={styles.overlay} variant="caption">{parsedDuration}</Typography>
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
