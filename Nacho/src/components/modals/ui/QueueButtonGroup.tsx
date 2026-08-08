import Button from '../../ui/Buttons/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { Grid } from '@mui/material';
import { Interaction } from '@interfaces/Interaction';
import { Lock } from '@mui/icons-material';
import { OpenYouTubeURL } from '@utils/OpenYoutubeURL';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { QueueStatus } from '@interfaces/QueueStatus';
import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { copyToClipboard } from '@utils/CopyToClipboard';
import { useQueueContext } from '@context/queue/QueueContext';
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
  const { queueData } = useQueueContext();
  const { video_id } = interaction.video;

  const locked = queueData.locked;

  const isCurrentlyPlaying = queueData.current_index === interaction.index;

  const processStash = async () => {
    if (isInStash(video_id)) {
      await deleteVideoFromStash(video_id);
    } else {
      await addVideoToStash(video_id);
    }
  };

  const processQueue = () => {
    let icon = <PlayCircleIcon color="success" />;
    let title = "Play";
    let disabled = false;
    let onClick = () => jumpQueue(interaction.index);

    if (isCurrentlyPlaying) {
      title = "Playing";
      disabled = true;
    } else if (locked) {
      icon = <Lock color="disabled" />;
      title = "Locked";
      disabled = true;
      onClick = () => {};
    }

    return (
      <Grid>
        <Button onClick={onClick} icon={icon} title={title} disabled={disabled} />
      </Grid>
    );
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
      {processQueue()}
    </>
  );
};

export default QueueButtonGroup;
