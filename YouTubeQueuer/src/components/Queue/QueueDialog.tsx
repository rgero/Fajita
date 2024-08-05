import { DialogContent, DialogTitle, Grid } from '@mui/material';
import { forwardRef, useEffect, useRef, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import QueueList from './QueueList';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QueueDialog = ({open, setQueueOpen} : {open: boolean, setQueueOpen: (open: boolean) => void}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const scrollRef = useRef<HTMLElement>(null);
 
  const handleClose = () => {
    setQueueOpen(false);
  };

    // This is for the scrolling.
    useEffect( () => {
      if( scrollRef.current ) {
        const yOffset = -80;
        const y = scrollRef?.current?.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }, [currentIndex]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      scroll="paper"
      TransitionComponent={Transition}
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
      <DialogContent>
        <QueueList scrollRef={scrollRef} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
      </DialogContent>
    </Dialog>
  );
}

export default QueueDialog;