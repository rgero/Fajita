import AddToQueueModal from "../modals/add_modals/AddToQueueModal";
import { Card } from "@mui/material";
import InfoOverlayButton from "../info_menus/InfoOverlayButton";
import VideoCard from "../ui/VideoCard";
import { YoutubeResponse } from '@interfaces/YoutubeResponse';
import toast from "react-hot-toast";
import { useQueueContext } from '@context/queue/QueueContext';
import { useState } from "react";

interface Props {
  data: YoutubeResponse;
}

const SearchCard: React.FC<Props> = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isConnected } = useQueueContext();

  const styles = {
    card: {
      position: "relative",
    },
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
        <InfoOverlayButton youtubeId={data.id} />
        <VideoCard data={data} clickFn={processOpenModal} />
      </Card>
    </>
  );
};

export default SearchCard;
