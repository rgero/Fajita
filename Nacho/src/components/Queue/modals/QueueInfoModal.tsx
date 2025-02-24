import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

import Button from '../../ui/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { Interaction } from '../../../interfaces/Interaction';
import Modal from '../../ui/Modal';
import { OpenYouTubeURL } from '../../../utils/OpenYoutubeURL';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { QueueStatus } from '../../../interfaces/QueueStatus';
import ShareIcon from '@mui/icons-material/Share';
import YouTubeIcon from '@mui/icons-material/YouTube'
import { copyToClipboard } from '../../../utils/CopyToClipboard';
import toast from 'react-hot-toast';
import { useQueueProvider } from '../../../context/QueueContext';
import { useSettings } from '../../../context/SettingsContext';
import { useSocketProvider } from '../../../context/WebSocketContext';
import { useStashProvider } from '../../../context/StashContext';
import { useState } from 'react';

const styles = {
  overlay: {
    position: 'absolute',
    top: '22px',
    right: '22px',
    color: 'white',
    backgroundColor: 'black',
    fontWeight: 'bold',
    paddingX: '10px',
    paddingY: "3px",
    borderRadius: 10
  }
};

interface Props {
  open: boolean,
  status: QueueStatus,
  interaction: Interaction,
  closeFn: () => void
}

const QueueInfoModal: React.FC<Props> = ({open, status, interaction, closeFn}) => {
  const {socket} = useSocketProvider();
  const {getQueueID} = useQueueProvider();
  const {isInStash, addVideoToStash, deleteVideoFromStash} = useStashProvider();
  const {shareOptions} = useSettings();
  const {deleteVideoFromQueue} = useQueueProvider();
  const {video_id, title, thumbnail, duration} = interaction.video;
  const [checkDelete, setConfirmDelete] = useState<boolean>(false);
  const parsedDuration = `${Math.floor(duration/60)}:${String(duration%60).padStart(2, '0')}`

  const checkConfirm = () => {
    setConfirmDelete(true);
  }

  const handleDelete = async () => {
    setConfirmDelete(false);
    try {
      await deleteVideoFromQueue(interaction.id);
      toast.success("Video Deleted");
      closeFn();
    } catch {
      toast.error("Error Deleting Video");
    }
  }

  const jumpQueue = () => {
    const videoIndex = interaction.index;
    if (socket) {
      socket.emit("set_index", {queue_id: getQueueID(), index: videoIndex});
    }
    toast.success("Jumping to Video");
    closeFn();
  }

  const processStash = async () => {
    try {
      if (isInStash(video_id)) {
        await deleteVideoFromStash(video_id);
        toast.success("Video Removed from Stash");
      } else {
        await addVideoToStash(video_id);
        toast.success("Video Added to Stash");
      }
    } catch {
      toast.error("Error Stashing Video");
    }
  }

  return (
    <Modal
      open={open}
      closeFn={closeFn}
    >
      <Grid container direction="column">
        <Card>
          <CardMedia
              component="img"
              sx={{height: {xs: 150, md:400}}}
              image={`${status.isVisible ? thumbnail : status.cover}`}
              alt={interaction.video.title}
          />
          <CardContent>
            <Typography variant="body1">{status.isVisible ? title : status.message}</Typography>
            {status.isVisible && (<Typography sx={styles.overlay} variant="caption">{parsedDuration}</Typography>)}
          </CardContent>
        </Card>
        <Grid container alignItems="center" justifyContent="space-evenly" sx={{marginTop: "0.5rem", height: 55, width: "100%"}}>
          {!checkDelete && (
            <>
              <Grid item>
                <Button onClick={checkConfirm} icon={(<DeleteForeverIcon color="error"/>)} title="Delete"/>
              </Grid>
              {status.isVisible &&
                <>
                  {shareOptions.clipboard && (
                    <Grid item>
                      <Button onClick={()=> copyToClipboard(interaction)} icon={(<ShareIcon/>)} title="Copy"/>
                    </Grid>
                  )}
                  {shareOptions.stash && (
                    <Grid item>
                      <Button onClick={processStash} icon={isInStash(video_id) ? <Favorite color="error"/> : <FavoriteBorder/>} title="Stash"/>
                    </Grid>
                  )}   
                  {shareOptions.youtube && (
                    <Grid item>
                      <Button onClick={() => OpenYouTubeURL(interaction)} icon={(<YouTubeIcon color="error"/>)} title="YouTube"/>
                    </Grid>   
                  )}
                </>
              }
              <Grid item>
                <Button onClick={() => jumpQueue()} icon={(<PlayCircleIcon color="success"/>)} title="Play"/>
              </Grid>
            </>
          )}
          {checkDelete && (
            <>
              <Grid item>
                <Button onClick={() => setConfirmDelete(false)} icon={(<DoNotDisturbIcon/>)} title="Cancel"/>
              </Grid>
              <Grid item>
                <Button onClick={handleDelete} icon={(<DeleteForeverIcon color="error"/>)} title="Delete"/>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Modal>
  )
}

export default QueueInfoModal
