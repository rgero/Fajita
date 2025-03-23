import * as React from 'react';

import Box from '@mui/material/Box';
import CurrentPlayingPresenter from './CurrentPlayingPresenter';
import FooterDrawer from './FooterDrawer';
import QueueDialog from '../Queue/QueueDialog';
import { useDialogContext } from '../../context/DialogContext';

export default function Footer() {
  const [isOpen, setOpen] = React.useState(false);
  const {queueOpen, setQueueOpen, areAnyOpen} = useDialogContext();

  const openDrawer = () =>
  {
    if (areAnyOpen) return;
    if (isOpen) return;
    setOpen(true);
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => 
  {
    if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setOpen(() => open);
  };

  const style = {
    borderTop: `1px solid black`,
    zIndex: 30
  }

  return (
    <>
      <Box onClick={openDrawer} sx={style} id="containingBox">
        <CurrentPlayingPresenter/>
        <FooterDrawer toggleDrawer={toggleDrawer} isOpen={isOpen}/>
      </Box>
      <QueueDialog open={queueOpen} setQueueOpen={setQueueOpen}/>
    </>
  );
}