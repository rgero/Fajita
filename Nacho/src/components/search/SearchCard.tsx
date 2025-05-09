import { Card, IconButton } from "@mui/material";

import AddToQueueModal from "../modals/AddToQueueModal";
import { MoreVert } from "@mui/icons-material";
import SearchMenu from "./SearchMenu";
import VideoCard from "../ui/VideoCard";
import { YoutubeResponse } from "../../interfaces/YoutubeResponse";
import toast from "react-hot-toast";
import { useQueueProvider } from "../../context/QueueContext";
import { useState } from "react";

interface Props {
  data: YoutubeResponse;
}

const styles = {
  card: {
    position: "relative",
  },
  overlayButton: {
    position: "absolute",
    top: "10px",
    left: "10px",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
  },
};

const SearchCard: React.FC<Props> = ({ data }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { isConnected } = useQueueProvider();

  const isMenuOpen = Boolean(menuAnchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const processOpenModal = () => {
    if (isConnected) {
      setModalOpen(true);
    } else {
      toast.error("You must be connected to a queue to add videos");
    }
  };

  return (
    <>
      <AddToQueueModal open={isModalOpen} videoData={data} closeFn={() => setModalOpen(false)} />
      <Card sx={styles.card}>
        <IconButton
          sx={styles.overlayButton}
          onClick={handleMenuOpen}
          aria-label="Options"
          color={isMenuOpen ? "warning" : "default"}
        >
          <MoreVert/>
        </IconButton>
        <SearchMenu
          data={data}
          anchorEl={menuAnchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
        />
        <VideoCard data={data} clickFn={processOpenModal} />
      </Card>
    </>
  );
};

export default SearchCard;
