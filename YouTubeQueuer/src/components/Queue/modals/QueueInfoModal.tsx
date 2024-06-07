import { Button, Card, CardContent, CardMedia, Grid, IconButton, Modal, Typography } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Interaction } from '../../../interfaces/Interaction';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { QueueStatus } from '../../../interfaces/QueueStatus';
import ShareIcon from '@mui/icons-material/Share';
import { copyToClipboard } from '../../../utils/CopyToClipboard';
import { useState } from 'react';

const styles = {
  card: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '80%', md: "45%"},
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: "gray",
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
  deleteFn: () => void;
  submitFn: () => void;
}

const QueueInfoModal: React.FC<Props> = ({open, status, interaction, deleteFn, closeFn, submitFn}) => {
  const {title, thumbnail, duration} = interaction.video;
  const [checkDelete, setConfirmDelete] = useState<boolean>(false);
  const parsedDuration = `${Math.floor(duration/60)}:${duration%60}`

  const checkConfirm = () => {
    setConfirmDelete(true);
  }

  const handleDelete = () => {
    setConfirmDelete(false);
    deleteFn();
  }

  const GetSecretCover = () => {
    if (status.isVisible) return;
    if (status.message?.includes("Daisy"))
    {
      return '/Daisy.png'
    } else {
      return '/BlackBox.png'
    }
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
              image={`${status.isVisible ? thumbnail : GetSecretCover()}`}
              alt={interaction.video.title}
          />
          <CardContent>
            <Typography variant="body1">{status.isVisible ? title : status.message}</Typography>
            <Typography sx={styles.overlay}>{parsedDuration}</Typography>
          </CardContent>
        </Card>
        <Grid container alignItems="center" justifyContent="space-evenly" sx={{marginTop: "0.5rem", height: 55, width: "100%"}}>
          {!checkDelete && (
            <>
              <Grid item>
                <IconButton color="error" onClick={checkConfirm}><DeleteForeverIcon/></IconButton>
              </Grid>
              {status.isVisible &&
                <Grid item>
                  <IconButton onClick={() => copyToClipboard(interaction)}><ShareIcon/></IconButton>
                </Grid>
              }
              <Grid item>
                <IconButton color="success" onClick={submitFn}><PlayCircleIcon/></IconButton>
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
