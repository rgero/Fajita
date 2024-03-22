import { Card, CardContent, CardMedia, Grid, Modal, Typography } from '@mui/material';

import { Button } from '@mui/base';
import { Interaction } from '../../../interfaces/Interaction';
import toast from 'react-hot-toast';
import { useSocket } from '../../../hooks/useWebSocket';

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
  interaction: Interaction,
  closeFn: () => void
  submitFn: (targetID: number) => void;
}

const QueueInfoModal: React.FC<Props> = ({open, interaction, closeFn, submitFn}) => {
  
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
              image={interaction.video.thumbnail}
              alt={interaction.video.title}
          />
          <CardContent>
            <Typography variant="body1">{interaction.video.title}</Typography>
          </CardContent>
        </Card>
        <Grid container alignItems="center" justifyContent="flex-end" spacing={5} sx={{paddingTop: "2em"}}>
          <Grid item>
            <Button onClick={submitFn}>Jump Queue</Button>
          </Grid>
        </Grid>


      </Grid>
    </Modal>
  )
}

export default QueueInfoModal
