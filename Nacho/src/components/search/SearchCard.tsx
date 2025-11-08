import { Card } from "@mui/material";
import InfoOverlayButton from "../info_menus/InfoOverlayButton";
import VideoCard from "../ui/VideoCard";
import { YoutubeResponse } from '@interfaces/YoutubeResponse';
import toast from "react-hot-toast";
import { useModalContext } from "@context/modal/ModalContext";
import { useQueueContext } from '@context/queue/QueueContext';
import { useSearchContext } from "@context/search/SearchContext";

interface Props {
  data: YoutubeResponse;
}

const SearchCard: React.FC<Props> = ({ data }) => {
  const { isConnected } = useQueueContext();
  const {setSelectedResult} = useSearchContext();
  const {toggleAddToQueueModalOpen} = useModalContext();

  const styles = {
    card: {
      position: "relative",
    },
  };

  const processOpenModal = () => {
    if (isConnected) {
      setSelectedResult(data);
      toggleAddToQueueModalOpen();

    } else {
      toast.error("You must be connected to a queue to add videos");
    }
  };

  return (
    <Card sx={styles.card}>
      <InfoOverlayButton youtubeId={data.id} />
      <VideoCard data={data} clickFn={processOpenModal} />
    </Card>
  );
};

export default SearchCard;
