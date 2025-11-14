import { Grid } from '@mui/material';
import Modal from './Modal';
import { ProcessVideo } from '@utils/SecretVideoProcessor';
import QueueButtonGroup from './ui/QueueButtonGroup';
import QueueDeleteConfirm from './ui/QueueDeleteConfirm';
import QueueInfoButton from '../queue/QueueInfoButton';
import VideoCard from '../ui/VideoCard';
import { YoutubeResponse } from '@interfaces/YoutubeResponse';
import toast from 'react-hot-toast';
import { useModalContext } from '@context/modal/ModalContext';
import { useQueueContext } from '@context/queue/QueueContext';
import { useSocketProvider } from '@context/websocket/WebsocketContext';
import { useState } from 'react';

const fadeOutAnimation = (isFadingOut: boolean) => ({
  transition: 'opacity 0.3s ease-in-out',
  opacity: isFadingOut ? 0 : 1,
});

const QueueInfoModal = () => {
  const {queueInfoModalOpen, toggleQueueInfoModalOpen} = useModalContext();
  const { currentlySelected, deleteVideoFromQueue, queueData } = useQueueContext();
  const { jumpQueue } = useSocketProvider();
  const [checkDelete, setConfirmDelete] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);


  const checkConfirm = (isDeleting: boolean) => {
    setIsFadingOut(true);
    setTimeout(() => {
      setConfirmDelete(isDeleting);
      setIsFadingOut(false);
    }, 300);
  };

  const handleDelete = async () => {
    try {
      if (!currentlySelected) return;
      await deleteVideoFromQueue(currentlySelected.id);
      setConfirmDelete(false);
      toast.success("Video deleted from queue");
      toggleQueueInfoModalOpen();
    } catch (error) {
      console.error("Error deleting video", error);
      toast.error("Failed to delete video from queue");
    }
  };

  const jumpVideo = (index: number) => {
    jumpQueue(index);
    toggleQueueInfoModalOpen();
  };

  if (!currentlySelected) return;

  const status = ProcessVideo(currentlySelected, queueData.current_index);

  console.log(status);

  const videoData: YoutubeResponse = {
    id: currentlySelected.video.video_id,
    title: status.isVisible ? currentlySelected.video.title : status.message ? status.message : "No title",
    thumbnail_src: status.isVisible ? currentlySelected.video.thumbnail : status.cover ? status.cover : "BlackBox.png",
    duration: currentlySelected.video.duration,
  }

  return (
    <Modal open={queueInfoModalOpen} closeFn={toggleQueueInfoModalOpen}>
      <>
        <VideoCard data={videoData}/>
        <Grid container alignItems="center" justifyContent="space-evenly" sx={{ marginTop: '0.5rem', height: 55, width: '100%', ...fadeOutAnimation(isFadingOut) }}>
          {checkDelete ? (
            <QueueDeleteConfirm onCancel={() => checkConfirm(false)} onDelete={handleDelete} />
          ) : (
            <QueueButtonGroup status={status} interaction={currentlySelected} checkConfirm={() => checkConfirm(true)} jumpQueue={jumpVideo} />
          )}
        </Grid>
        <QueueInfoButton interaction={currentlySelected} disableHanded={false} smallButton={false} offset={"22px"}/>
      </>
    </Modal>
  );
};

export default QueueInfoModal;
