import * as React from 'react';

import Box from '@mui/material/Box';
import FooterCard from './FooterCard';
import FooterDrawer from './FooterDrawer';
import QueueDialog from '../Queue/QueueDialog';
import { offsetHexColor } from '../../utils/HexColorOffset';
import { useDarkMode } from '../../context/DarkModeContext';
import { useSwipeable } from 'react-swipeable';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const {isDarkMode} = useDarkMode();
  const theme = useTheme();
  const [isOpen, setOpen] = React.useState(false);
  const [isQueueOpen, setQueueOpen] = React.useState(false);

  const goToQueue = () => {
    setQueueOpen(true);
  }

  const goBack = () => {
    setQueueOpen(false);
  }

  const openDrawer = () =>
  {
    if (isOpen) return;
    setOpen(true);
  }

  const handlers = useSwipeable({
    onSwipedUp: goToQueue,
    onSwipedDown: goBack,
    onTap: openDrawer,
    delta: 10,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
    rotationAngle: 0,
    swipeDuration: Infinity,
    touchEventOptions: { passive: true },
  });

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => 
  {
    if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setOpen(() => open);
  };



  const backgroundLightened =  isDarkMode ? (offsetHexColor(theme.palette.background.default, 30)) : theme.palette.background.paper;

  const style = {
    bgcolor: `${backgroundLightened}`,
    borderTop: `1px solid black`,
    minWidth: "100%",
    bottom: 0,
    padding: "8px 8px 20px 8px",
    zIndex: 30
  }


  return (
    <>
      <QueueDialog open={isQueueOpen} setQueueOpen={setQueueOpen}/>
      <Box {...handlers} position="fixed" sx={style} id="containingBox">
        <FooterCard/>
        <FooterDrawer toggleDrawer={toggleDrawer} isOpen={isOpen} isQueueOpen={isQueueOpen} setQueueOpen={setQueueOpen}/>
      </Box>
    </>
  );
}