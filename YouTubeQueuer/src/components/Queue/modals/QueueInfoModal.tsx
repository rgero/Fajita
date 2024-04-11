import { Button, Card, CardContent, CardMedia, Grid, IconButton, Modal, Typography } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Interaction } from '../../../interfaces/Interaction';
import { QueueStatus } from '../../../interfaces/QueueStatus';
import ShareIcon from '@mui/icons-material/Share';
import { copyToClipboard } from '../../../utils/CopyToClipboard';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '80%', md: "45%"},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
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
  const {title, thumbnail} = interaction.video;
  const [checkDelete, setConfirmDelete] = useState<boolean>(false);

  const checkConfirm = () => {
    setConfirmDelete(true);
  }

  const handleDelete = () => {
    setConfirmDelete(false);
    deleteFn();
  }

  return (
    <Modal
      open={open}
      onClose={closeFn}
    >
      <Grid container direction="column" sx={style}>
        <Card>
          <CardMedia
              component="img"
              sx={{height: 150}}
              image={`${status.isVisible ? thumbnail : '/BlackBox.png'}`}
              alt={interaction.video.title}
          />
          <CardContent>
            <Typography variant="body1">{status.isVisible ? title : status.message}</Typography>
          </CardContent>
        </Card>

          {!checkDelete && (
            <Grid container alignItems="center" justifyContent="space-between" sx={{paddingTop: "1em"}}>
              <Grid item>
                <IconButton color="error" onClick={checkConfirm}><DeleteForeverIcon/></IconButton>
              </Grid>
              {status.isVisible &&
                <Grid item>
                  <IconButton color="warning" onClick={() => copyToClipboard(interaction)}><ShareIcon/></IconButton>
                </Grid>
              }
              <Grid item>
                <Button onClick={submitFn}>Jump Queue</Button>
              </Grid>
            </Grid>
          )}
          {checkDelete && (
            <Grid container alignItems="center" justifyContent="space-between" sx={{paddingTop: "1rem"}}>
              <Grid item>
                <Typography>Are you sure?</Typography>
              </Grid>
              <Grid item>
                <Button onClick={() => setConfirmDelete(false)}>No</Button>
              </Grid>
              <Grid item>
                <Button color="error" variant="contained" onClick={handleDelete}>Yes</Button>
              </Grid>
            </Grid>
          )}
      </Grid>
    </Modal>
  )
}

export default QueueInfoModal
