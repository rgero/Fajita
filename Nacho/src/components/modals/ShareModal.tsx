import { Grid, Stack } from '@mui/material';
import Modal from './Modal';
import ShareButtons from '@components/ui/ShareButtons';
import VideoCard from '@components/ui/VideoCard';
import { YoutubeResponse } from '@interfaces/YoutubeResponse';
import { getVideoData } from '@utils/YouTubeResponseGenerator';
import { useEffect, useMemo } from 'react';
import { useModalContext } from '@context/modal/ModalContext';
import { useQueueContext } from '@context/queue/QueueContext';

const ShareModal: React.FC = () => {
  const { shareModalOpen, toggleShareModalOpen } = useModalContext();
  const {queueData} = useQueueContext();

  const videoData: YoutubeResponse | null = useMemo(
    () => getVideoData(queueData.current_interaction),
    [queueData]
  );

  useEffect(() => {
    if (shareModalOpen && !videoData) {
      toggleShareModalOpen();
    }
  }, [shareModalOpen, videoData, toggleShareModalOpen]);

  if (!videoData) {
    return null;
  }

  return (
    <Modal open={shareModalOpen} closeFn={toggleShareModalOpen}>
      <Stack spacing={2}>
        <VideoCard data={videoData} />
        <Grid container spacing={1} sx={{ justifyContent: "space-around" }}>
          <ShareButtons targetID={videoData.id}/>
        </Grid>
      </Stack>
    </Modal>
  );
};

export default ShareModal;
