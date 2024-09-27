import { Box, Button, DialogTitle, Grid } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import QueueContent from './QueueContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QueueDialog = ({open, setQueueOpen} : {open: boolean, setQueueOpen: (open: boolean) => void}) => {
  
  const handleClose = () => {
    setQueueOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      scroll="paper"
      TransitionComponent={Transition}
      sx={{zIndex: 15}}
    >
      <DialogTitle id="scroll-dialog-title">
        <Grid container alignItems="center">
          <Grid item>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              Queue
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <QueueContent/>
      <Box sx={{padding: 2}}>
        <Button onClick={handleClose} variant="contained" fullWidth>
          Close Queue
        </Button>
      </Box>
    </Dialog>
  );
}

export default QueueDialog;