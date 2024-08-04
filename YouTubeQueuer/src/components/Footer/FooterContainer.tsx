import * as React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import FooterCard from './FooterCard';
import FooterDrawer from './FooterDrawer';
import { offsetHexColor } from '../../utils/HexColorOffset';
import { useSwipeable } from 'react-swipeable';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const theme = useTheme();
  const [isOpen, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    // We want to go back to the Search Page
    // Ideally retaining what the person had searched before.
    if (location.key === "default")
    {
      navigate('/')
    } else {
      navigate(-1);
    }
  }

  const handlers = useSwipeable({
    onSwipedUp: () => navigate('/queue'),
    onSwipedDown: () => goBack(),
    onTap: () => openDrawer(),
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

  // This needs to exist because otherwise the event lose the race condition.
  const openDrawer = () =>
  {
    if (isOpen)
    {
      return;
    } 
    setOpen(true);
  }

  const backgroundLightened = offsetHexColor(theme.palette.background.default, 30);

  const style = {
    bgcolor: `${backgroundLightened}`,
    borderTop: `1px solid black`,
    minWidth: "100%",
    bottom: 0,
    padding: "8px 8px 20px 8px",
    zIndex: 25
  }


  return (
    <Box {...handlers} position="fixed" sx={style} id="containingBox">
      <FooterCard/>
      <FooterDrawer toggleDrawer={toggleDrawer} isOpen={isOpen}/>
    </Box>
  );
}