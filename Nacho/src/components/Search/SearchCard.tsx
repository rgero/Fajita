import { Card, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

import AddToQueueModal from "./modals/AddToQueueModal";
import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VideoCard from "../ui/VideoCard";
import { YoutubeResponse } from "../../interfaces/YoutubeResponse";
import toast from "react-hot-toast";
import { useStashProvider } from "../../context/StashContext";

interface Props {
  data: YoutubeResponse;
}

const styles = {
  card: {
    position: "relative",
  },
  overlayButton: {
    position: "absolute", // Absolute positioning for the button
    top: "10px",          // Position from the top of the card
    left: "10px",        // Position from the right of the card
    zIndex: 1,            // Ensures the button appears on top
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Light background
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)", // Highlight on hover
    },
  },
};

const SearchCard: React.FC<Props> = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [inStash, setInStash] = useState(false);
  const {addVideoToStash, deleteVideoFromStash, isLoading, stashData} = useStashProvider();

  useEffect(() => {
    if (!stashData || isLoading) {
      return;
    }

    if (stashData.artifacts.some((artifact) => artifact.video.video_id === data.id)) {
      setInStash(true);
    } else {
      setInStash(false);
    }
  }, [stashData])

  const handleAddToStash = async () => {
    try {
      await addVideoToStash(data.id);
      toast.success("Video added to stash");
    } catch (err: any) {
      toast.error("Failed to add video to stash");
    }
  };

  const handleRemoveFromStash = async () => {
    try {
      await deleteVideoFromStash(data.id);
      toast.success("Video removed from stash");
    } catch (err: any) {
      toast.error("Failed to remove video from stash");
    }
  }

  return (
    <>
      <AddToQueueModal open={isModalOpen} videoData={data} closeFn={() => setModalOpen(false)} />
      <Card sx={styles.card}>
        <IconButton
          sx={styles.overlayButton}
          onClick={inStash ? handleRemoveFromStash : handleAddToStash}
          aria-label={inStash ? "Remove from Stash" : "Add to Stash"}
        >
          {inStash ? <FavoriteIcon color="error" /> : <FavoriteBorder/> }
        </IconButton>
        <VideoCard data={data} clickFn={() => setModalOpen(() => true)} />
      </Card>
    </>
  );
};

export default SearchCard;
