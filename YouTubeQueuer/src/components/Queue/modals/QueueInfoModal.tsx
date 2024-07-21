import { Button, Card, CardContent, CardMedia, Grid, IconButton, Modal, Typography, useTheme } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Interaction } from '../../../interfaces/Interaction';
import { OpenYouTubeURL } from '../../../utils/OpenYoutubeURL';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { QueueStatus } from '../../../interfaces/QueueStatus';
import ShareIcon from '@mui/icons-material/Share';
import YouTubeIcon from '@mui/icons-material/YouTube'
import { copyToClipboard } from '../../../utils/CopyToClipboard';
import { offsetHexColor } from '../../../utils/HexColorOffset';
import toast from 'react-hot-toast';
import { useDeleteInteraction } from '../hooks/useDeleteInteraction';
import { useQueueProvider } from '../../../context/QueueContext';
import { useSocket } from '../../../context/WebSocketContext';
import { useState } from 'react';

const styles = {
  card: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '80%', md: "45%"},
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
  },
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
  const socket = useSocket();
  const {getQueueID} = useQueueProvider();
  const {deleteInteraction} = useDeleteInteraction();
  const {title, thumbnail, duration} = interaction.video;
  const [checkDelete, setConfirmDelete] = useState<boolean>(false);
  const parsedDuration = `${Math.floor(duration/60)}:${String(duration%60).padStart(2, '0')}`

  const theme = useTheme();
  const colorOffset = 30;
  styles.card.bgcolor = theme.palette.mode == "light" ? 'background.paper' : offsetHexColor(theme.palette.background.paper, colorOffset);

  const checkConfirm = () => {
    setConfirmDelete(true);
  }

  const handleDelete = async () => {
    setConfirmDelete(false);
    await deleteInteraction(interaction.id);
    closeFn();
  }

  const jumpQueue = () => {
    const videoIndex = interaction.id;
    socket.emit("set_player_index", {queue_id: getQueueID(), video_id: videoIndex})
    toast.success("Jumping to Video");
    closeFn();
  }

  return (
    <Modal
      open={open}
      onClose={closeFn}
    >
      <Grid container direction="column" sx={styles.card}>
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
                <IconButton color="error" onClick={checkConfirm}><DeleteForeverIcon/></IconButton>
              </Grid>
              {status.isVisible &&
                <>
                  <Grid item>
                    <IconButton onClick={() => copyToClipboard(interaction)}><ShareIcon/></IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton color="error" onClick={() => OpenYouTubeURL(interaction)}><YouTubeIcon/></IconButton>
                  </Grid>                  
                </>
              }
              <Grid item>
                <IconButton color="success" onClick={jumpQueue}><PlayCircleIcon/></IconButton>
              </Grid>
            </>
          )}
          {checkDelete && (
            <>
              <Grid item>
                <Typography>Are you sure?</Typography>
              </Grid>
              <Grid item>
                <Button onClick={() => setConfirmDelete(false)}>No</Button>
              </Grid>
              <Grid item>
                <Button color="error" variant="contained" onClick={handleDelete}>Yes</Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Modal>
  )
}

export default QueueInfoModal
