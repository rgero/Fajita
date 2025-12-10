import { Card } from "@mui/material";
import InfoOverlayButton from "../info_menus/InfoOverlayButton";
import VideoCard from "../ui/VideoCard";
import { YoutubeResponse } from '@interfaces/YoutubeResponse';
import { useModalContext } from "@context/modal/ModalContext";
import { useSearchContext } from "@context/search/SearchContext";

interface Props {
  data: YoutubeResponse;
}

const SearchCard: React.FC<Props> = ({ data }) => {
  const {setSelectedResult} = useSearchContext();
  const {toggleAddToQueueModalOpen} = useModalContext();

  const styles = {
    card: {
      position: "relative",
    },
  };

  const processOpenModal = () => {
    setSelectedResult(data);
    toggleAddToQueueModalOpen();
  };

  return (
    <Card sx={styles.card}>
      <InfoOverlayButton youtubeId={data.id} />
      <VideoCard data={data} clickFn={processOpenModal} />
    </Card>
  );
};

export default SearchCard;
