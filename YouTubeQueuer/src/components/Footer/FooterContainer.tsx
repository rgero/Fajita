import * as React from 'react';

import { useLocation, useNavigate } from "react-router-dom";

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
  const isQueueOpenRef = React.useRef(isQueueOpen);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    isQueueOpenRef.current = isQueueOpen;
  }, [isQueueOpen]);

  React.useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isQueueOpenRef.current) {
        setQueueOpen(false);
        event.preventDefault();
      }
    };

    window.addEventListener('popstate', handlePopState, { passive: false });

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const goToQueue = () => {
    setQueueOpen(true);
    const fullPath = `${location.pathname}${location.search}${location.hash}`;
    navigate(fullPath, { replace: false });
  }

  const goBack = () => {
    if (isQueueOpen) {
      setQueueOpen(false);
      history.back();
    }
  };

  const openDrawer = () =>
  {
    if (isOpen) return;
    setOpen(true);
  }

  const handlers = useSwipeable({
    onSwipedUp: goToQueue,
    onSwipedDown: goBack,
    onTap: openDrawer,
    delta: 15,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
    rotationAngle: 0,
    swipeDuration: Infinity
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
    padding: "8px 8px 20px 8px",
    zIndex: 30
  }

  return (
    <>
      <QueueDialog open={isQueueOpen} setQueueOpen={setQueueOpen}/>
      <Box {...handlers} sx={style} id="containingBox">
        <FooterCard/>
        <FooterDrawer toggleDrawer={toggleDrawer} isOpen={isOpen} isQueueOpen={isQueueOpen} setQueueOpen={setQueueOpen}/>
      </Box>
    </>
  );
}