import { Grid } from '@mui/material';
import Modal from './Modal';
import ShareButtons from '@components/ui/ShareButtons';
import VideoCard from '@components/ui/VideoCard';
import { YoutubeResponse } from '@interfaces/YoutubeResponse';
import { getVideoData } from '@utils/YouTubeResponseGenerator';
import { useMemo } from 'react';
import { useModalContext } from '@context/modal/ModalContext';
import { useQueueContext } from '@context/queue/QueueContext';

const ShareModal: React.FC = () => {
  const { shareModalOpen, toggleShareModalOpen } = useModalContext();
  const {queueData} = useQueueContext();

  const videoData: YoutubeResponse | null = useMemo(
    () => getVideoData(queueData),
    [queueData]
  );

  if (!videoData) {
    if (shareModalOpen)
    {
      toggleShareModalOpen();
    }
    return;
  }

  return (
    <Modal open={shareModalOpen} closeFn={toggleShareModalOpen}>
      <Grid container direction="column" spacing={2}>
        <VideoCard data={videoData} />
        <Grid container direction="row" spacing={1} justifyContent="space-around">
          <ShareButtons targetID={videoData.id}/>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ShareModal;
