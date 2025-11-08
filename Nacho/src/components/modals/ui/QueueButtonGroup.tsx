import Button from '../../ui/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { Grid } from '@mui/material';
import { Interaction } from '@interfaces/Interaction';
import { OpenYouTubeURL } from '@utils/OpenYoutubeURL';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { QueueStatus } from '@interfaces/QueueStatus';
import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { copyToClipboard } from '@utils/CopyToClipboard';
import { useSettings } from '@context/settings/SettingsContext';
import { useStashContext } from '@context/stash/StashContext';

interface Props {
  interaction: Interaction;
  status: QueueStatus;
  checkConfirm: () => void;
  jumpQueue: (index: number) => void;
}

const QueueButtonGroup: React.FC<Props> = ({ interaction, status, checkConfirm, jumpQueue }) => {
  const { shareOptions } = useSettings();
  const { isInStash, addVideoToStash, deleteVideoFromStash } = useStashContext();
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
      <Grid>
        <Button onClick={checkConfirm} icon={<DeleteForeverIcon color="error" />} title="Delete" />
      </Grid>
      {status.isVisible && (
        <>
          {shareOptions.clipboard && (
            <Grid>
              <Button
                onClick={() => copyToClipboard(interaction)}
                icon={<ShareIcon />}
                title="Copy"
              />
            </Grid>
          )}

          {shareOptions.stash && (
            <Grid>
              <Button
                onClick={processStash}
                icon={isInStash(video_id) ? <Favorite color="error" /> : <FavoriteBorder />}
                title="Stash"
              />
            </Grid>
          )}

          {shareOptions.youtube && (
            <Grid>
              <Button
                onClick={() => OpenYouTubeURL(interaction.video.video_id)}
                icon={<YouTubeIcon color="error" />}
                title="YouTube"
              />
            </Grid>
          )}
        </>
      )}
      <Grid>
        <Button onClick={()=> jumpQueue(interaction.index)} icon={<PlayCircleIcon color="success" />} title="Play" />
      </Grid>
    </>
  );
};

export default QueueButtonGroup;
