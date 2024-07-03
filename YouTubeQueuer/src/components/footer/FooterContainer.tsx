import * as React from 'react';

import Box from '@mui/material/Box';
import FooterCard from './FooterCard';
import FooterDrawer from './FooterDrawer';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const theme = useTheme();
  const [isOpen, setOpen] = React.useState(false);

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

  const style = {
    bgcolor: `${theme.palette.background.default}`,
    borderTop: `2px solid ${theme.palette.primary.light}`,
    minWidth: "100%",
    bottom: 0,
    padding: "8px 8px 20px 8px",
    zIndex: 25
  }


  return (
    <Box position="fixed" sx={style} id="containingBox" onClick={openDrawer}>
      <FooterCard/>
      <FooterDrawer toggleDrawer={toggleDrawer} isOpen={isOpen}/>
    </Box>
  );
}