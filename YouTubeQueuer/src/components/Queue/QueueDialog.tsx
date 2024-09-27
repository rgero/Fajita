import { Box, Button, ButtonProps, DialogTitle, Grid, styled } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import QueueContent from './QueueContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import { forwardRef } from 'react';
import { grey } from '@mui/material/colors';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CloseButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[500]),
  backgroundColor: grey[700],
  '&:hover': {
    backgroundColor: grey[800],
  },
}));

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
        <CloseButton onClick={handleClose} variant="contained" fullWidth>
          Close Queue
        </CloseButton>
      </Box>
    </Dialog>
  );
}

export default QueueDialog;