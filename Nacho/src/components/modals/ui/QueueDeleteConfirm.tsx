import Button from '../../ui/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { Grid } from '@mui/material';
import React from 'react';

interface Props {
  onCancel: () => void;
  onDelete: () => void;
}

const QueueDeleteConfirm: React.FC<Props> = ({ onCancel, onDelete }) => {
  return (
    <>
      <Grid item>
        <Button onClick={onCancel} icon={<DoNotDisturbIcon />} title="Cancel" />
      </Grid>
      <Grid item>
        <Button onClick={onDelete} icon={<DeleteForeverIcon color="error" />} title="Delete" />
      </Grid>
    </>
  );
};

export default QueueDeleteConfirm;
