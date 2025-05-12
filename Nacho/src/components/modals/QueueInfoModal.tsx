import { Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';

import { Interaction } from '../../interfaces/Interaction';
import Modal from './Modal';
import { MoreVert } from '@mui/icons-material';
import QueueButtonGroup from './ui/QueueButtonGroup';
import QueueDeleteConfirm from './ui/QueueDeleteConfirm';
import QueueInfoMenu from '../queue/QueueInfoMenu';
import { QueueStatus } from '../../interfaces/QueueStatus';
import VideoCard from '../ui/VideoCard';
import { YoutubeResponse } from '../../interfaces/YoutubeResponse';
import toast from 'react-hot-toast';
import { useQueueProvider } from '../../context/QueueContext';
import { useSettings } from '../../context/SettingsContext';
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
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const { deleteVideoFromQueue } = useQueueProvider();
  const { jumpQueue } = useSocketProvider();
  const [checkDelete, setConfirmDelete] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const {isRightHanded} = useSettings();
  const isMenuOpen = Boolean(menuAnchorEl);

  const styles = {
    overlayButton: {
      position: "absolute",
      top: "22px",
      left: isRightHanded ? null : "22px",
      right: isRightHanded ? "22px" : null,
      zIndex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      },
    },
  };

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
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
        <IconButton
          sx={styles.overlayButton}
          onClick={handleMenuOpen}
          aria-label="Options"
          color={isMenuOpen ? "warning" : "default"}
        >
          <MoreVert/>
        </IconButton>
        <QueueInfoMenu
          data={interaction}
          anchorEl={menuAnchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
        />
      </>
    </Modal>
  );
};

export default QueueInfoModal;
