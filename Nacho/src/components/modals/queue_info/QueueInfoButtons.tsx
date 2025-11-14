import { Grid } from "@mui/material";
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

const QueueInfoButtons = ({
  checkDelete,
  isFadingOut,
  status,
  currentlySelected,
  checkConfirm,
  jumpVideo,
  handleDelete
}: QueueInfoButtonsProps) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-evenly"
      sx={{
        marginTop: '0.5rem',
        height: 55,
        width: '100%',
        ...fadeOutAnimation(isFadingOut)
      }}
    >
      {checkDelete ? (
        <QueueDeleteConfirm
          onCancel={() => checkConfirm(false)}
          onDelete={handleDelete}
        />
      ) : (
        <QueueButtonGroup
          status={status}
          interaction={currentlySelected}
          checkConfirm={() => checkConfirm(true)}
          jumpQueue={jumpVideo}
        />
      )}
    </Grid>
  );
};

export default React.memo(QueueInfoButtons);
