import { Box, Fade, Grid } from "@mui/material";

import QueueButtonGroup from "../ui/QueueButtonGroup";
import QueueDeleteConfirm from "../ui/QueueDeleteConfirm";
import React from 'react';

const fadeOutAnimation = (isFadingOut: boolean) => ({
  transition: 'opacity 0.3s ease-in-out',
  opacity: isFadingOut ? 0 : 1,
});

interface QueueInfoButtonsProps {
  checkDelete: boolean;
  isFadingOut: boolean;
  status: any;
  currentlySelected: any;
  checkConfirm: (isDeleting: boolean) => void;
  jumpVideo: (index: number) => void;
  handleDelete: () => void;
}

const QueueInfoButtons = ({ checkDelete, isFadingOut, status, currentlySelected, checkConfirm, jumpVideo, handleDelete}: QueueInfoButtonsProps) => {
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: '0.5rem',
        height: 55,
        width: '100%',
        position: 'relative', // Establishes the boundary for absolute children
        ...fadeOutAnimation(isFadingOut)
      }}
    >
      <Fade 
        in={!checkDelete} 
        timeout={{ enter: 250, exit: 200 }} 
        mountOnEnter 
        unmountOnExit
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            width: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <QueueButtonGroup
            status={status}
            interaction={currentlySelected}
            checkConfirm={() => checkConfirm(true)}
            jumpQueue={jumpVideo}
          />
        </Box>
      </Fade>
      <Fade 
        in={checkDelete} 
        timeout={{ enter: 250, exit: 200 }} 
        mountOnEnter 
        unmountOnExit
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            width: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <QueueDeleteConfirm
            onCancel={() => checkConfirm(false)}
            onDelete={handleDelete}
          />
        </Box>
      </Fade>
    </Grid>
  );
};

export default React.memo(QueueInfoButtons);