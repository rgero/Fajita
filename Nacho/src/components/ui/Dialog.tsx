import { Box, Button, DialogContent, DialogTitle, Grid, useTheme } from '@mui/material';
import { forwardRef, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MaterialDialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { useDarkMode } from '../../context/DarkModeContext';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = ({open, setOpen, title, children, titleButtons} : {open: boolean, setOpen: (open: boolean) => void, title: string, children: React.ReactNode, titleButtons?: React.ReactNode}) => {
  const theme = useTheme();
  const {isDarkMode} = useDarkMode();
  
  const handleClose = () => {
    setOpen(false);
    if (window.history.state?.dialogOpen) {
      window.history.back();
    }
  };

  // An attempt at handling the back button.
  useEffect(() => {
    const handlePopState = () => {
      if (open) {
        setOpen(false);
      }
    };

    if (open) {
      window.history.pushState({ dialogOpen: true }, "Dialog Open", "/dialog");
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [open, setOpen]);

  return (
    <MaterialDialog
      fullScreen
      open={open}
      onClose={handleClose}
      scroll="paper"
      TransitionComponent={Transition}
      sx={{zIndex: 15}}
      PaperProps={{
        sx: {
          backgroundColor: isDarkMode ? grey[900] : theme.palette.primary.main,
        }
      }}
    >
      <DialogTitle id="scroll-dialog-title">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Grid container alignItems="center">
              <Grid>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid>
                <Typography variant="h5">
                  {title}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            {titleButtons}
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{background: theme.palette.background.paper, paddingBottom: "120px"}}>
        <Box sx={{
          width: {xs: "100%", md: "60%"},
          margin: "auto"
        }}>
          {children}
        </Box>
      </DialogContent>
      <Box sx={{padding: 2}}>
        <Button 
          onClick={handleClose} 
          variant="contained" 
          fullWidth
        >
          Close
        </Button>
      </Box>
    </MaterialDialog>
  );
}

export default Dialog;