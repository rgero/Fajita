import React, { useState } from 'react';

import { Grid } from '@mui/material';
import { Interaction } from '../../interfaces/Interaction';
import Modal from './Modal';
import QueueButtonGroup from './ui/QueueButtonGroup';
import QueueDeleteConfirm from './ui/QueueDeleteConfirm';
import QueueInfoButton from '../queue/QueueInfoButton';
import { QueueStatus } from '../../interfaces/QueueStatus';
import VideoCard from '../ui/VideoCard';
import { YoutubeResponse } from '../../interfaces/YoutubeResponse';
import toast from 'react-hot-toast';
import { useQueueProvider } from '../../context/queue/QueueContext';
import { useSocketProvider } from '../../context/WebSocketContext';

interface Props {
  open: boolean;
  status: QueueStatus;
  interaction: Interaction;
  closeFn: () => void;
}

const fadeOutAnimation = (isFadingOut: boolean) => ({
  transition: 'opacity 0.3s ease-in-out',
  opacity: isFadingOut ? 0 : 1,
});

const QueueInfoModal: React.FC<Props> = ({ open, status, interaction, closeFn }) => {
  const { deleteVideoFromQueue } = useQueueProvider();
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
      await deleteVideoFromQueue(interaction.id);
      setConfirmDelete(false);
      toast.success("Video deleted from queue");
      closeFn();
    } catch (error) {
      console.error("Error deleting video", error);
      toast.error("Failed to delete video from queue");
    }
  };

  const jumpVideo = (index: number) => {
    jumpQueue(index);
    closeFn();
  };

  const videoData: YoutubeResponse = {
    id: interaction.video.video_id,
    title: status.isVisible ? interaction.video.title : status.message ? status.message : "No title",
    thumbnail_src: status.isVisible ? interaction.video.thumbnail : status.cover ? status.cover : "BlackBox.png",
    duration: interaction.video.duration,
  }

  return (
    <Modal open={open} closeFn={closeFn}>
      <>
        <VideoCard data={videoData}/>
        <Grid container alignItems="center" justifyContent="space-evenly" sx={{ marginTop: '0.5rem', height: 55, width: '100%', ...fadeOutAnimation(isFadingOut) }}>
          {checkDelete ? (
            <QueueDeleteConfirm onCancel={() => checkConfirm(false)} onDelete={handleDelete} />
          ) : (
            <QueueButtonGroup status={status} interaction={interaction} checkConfirm={() => checkConfirm(true)} jumpQueue={jumpVideo} />
          )}
        </Grid>
        <QueueInfoButton interaction={interaction} disableHanded={false} smallButton={false} offset={"22px"}/>
      </>
    </Modal>
  );
};

export default QueueInfoModal;
