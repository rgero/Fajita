import * as React from 'react';

import Box from '@mui/material/Box';
import CurrentPlayingPresenter from './CurrentPlayingPresenter';
import FooterDrawer from './FooterDrawer';
import { useDialogContext } from '../../context/DialogContext';

const isRunningStandalone = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}


export default function Footer() {
  const [isOpen, setOpen] = React.useState(false);
  const {areAnyOpen} = useDialogContext();

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
    zIndex: 30,
    paddingBottom: isRunningStandalone() ? "12px" : 0,
  }

  return (
    <Box onClick={openDrawer} sx={style} id="containingBox">
      <CurrentPlayingPresenter/>
      <FooterDrawer toggleDrawer={toggleDrawer} isOpen={isOpen}/>
    </Box>
  );
}