import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

import { Interaction } from '../../../interfaces/Interaction';
import Modal from '../../ui/Modal';
import QueueButtonGroup from './QueueButtonGroup';
import QueueDeleteConfirm from './QueueDeleteConfirm';
import { QueueStatus } from '../../../interfaces/QueueStatus';
import { getParsedDuration } from '../../../utils/getParsedDuration';
import { useQueueProvider } from '../../../context/QueueContext';
import { useSocketProvider } from '../../../context/WebSocketContext';

interface Props {
  open: boolean;
  status: QueueStatus;
  interaction: Interaction;
  closeFn: () => void;
}

const styles = {
  overlay: {
    position: 'absolute',
    top: '22px',
    right: '22px',
    color: 'white',
    backgroundColor: 'black',
    fontWeight: 'bold',
    paddingX: '10px',
    paddingY: '3px',
    borderRadius: 10,
  },
};

const fadeOutAnimation = (isFadingOut: boolean) => ({
  transition: 'opacity 0.3s ease-in-out',
  opacity: isFadingOut ? 0 : 1,
});

const QueueInfoModal: React.FC<Props> = ({ open, status, interaction, closeFn }) => {
  const { deleteVideoFromQueue } = useQueueProvider();
  const {jumpQueue} = useSocketProvider();
  const { title, thumbnail, duration } = interaction.video;
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
      closeFn();
    } catch {
      console.error("Error deleting video");
    }
  };
  const jumpVideo = (index: number) => {
    jumpQueue(index);
    closeFn();
  };

  return (
    <Modal open={open} closeFn={closeFn}>
      <Grid container direction="column">
        <Card>
          <CardMedia
            component="img"
            sx={{ height: { xs: 150, md: 400 } }}
            image={status.isVisible ? thumbnail : status.cover || ''}
            alt={title}
          />
          <CardContent>
            <Typography variant="body1">{status.isVisible ? title : status.message}</Typography>
            {status.isVisible && (
              <Typography sx={styles.overlay} variant="caption">{getParsedDuration(duration)}</Typography>
            )}
          </CardContent>
        </Card>
        <Grid container alignItems="center" justifyContent="space-evenly" sx={{ marginTop: '0.5rem', height: 55, width: '100%', ...fadeOutAnimation(isFadingOut) }}>
          {checkDelete ? (
            <QueueDeleteConfirm onCancel={() => checkConfirm(false)} onDelete={handleDelete} />
          ) : (
            <QueueButtonGroup interaction={interaction} checkConfirm={() => checkConfirm(true)} jumpQueue={jumpVideo}/>
          )}
        </Grid>
      </Grid>
    </Modal>
  );
};

export default QueueInfoModal;
