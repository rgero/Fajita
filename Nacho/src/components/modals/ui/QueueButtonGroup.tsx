import Button from '../../ui/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { Grid } from '@mui/material';
import { Interaction } from '../../../interfaces/Interaction';
import { OpenYouTubeURL } from '../../../utils/OpenYoutubeURL';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { copyToClipboard } from '../../../utils/CopyToClipboard';
import { useSettings } from '../../../context/SettingsContext';
import { useStashProvider } from '../../../context/StashContext';

interface Props {
  interaction: Interaction;
  checkConfirm: () => void;
  jumpQueue: (index: number) => void;
}

const QueueButtonGroup: React.FC<Props> = ({ interaction, checkConfirm, jumpQueue }) => {
  const { shareOptions } = useSettings();
  const { isInStash, addVideoToStash, deleteVideoFromStash } = useStashProvider();
  const { video_id } = interaction.video;

  const processStash = async () => {
    if (isInStash(video_id)) {
      await deleteVideoFromStash(video_id);
    } else {
      await addVideoToStash(video_id);
    }
  };

  return (
    <>
      <Grid item>
        <Button onClick={checkConfirm} icon={<DeleteForeverIcon color="error" />} title="Delete" />
      </Grid>
      {shareOptions.clipboard && (
        <Grid item>
          <Button onClick={() => copyToClipboard(interaction)} icon={<ShareIcon />} title="Copy" />
        </Grid>
      )}
      {shareOptions.stash && (
        <Grid item>
          <Button onClick={processStash} icon={isInStash(video_id) ? <Favorite color="error" /> : <FavoriteBorder />} title="Stash" />
        </Grid>
      )}
      {shareOptions.youtube && (
        <Grid item>
          <Button onClick={() => OpenYouTubeURL(interaction.video.video_id)} icon={<YouTubeIcon color="error" />} title="YouTube" />
        </Grid>
      )}
      <Grid item>
        <Button onClick={()=> jumpQueue(interaction.index)} icon={<PlayCircleIcon color="success" />} title="Play" />
      </Grid>
    </>
  );
};

export default QueueButtonGroup;
