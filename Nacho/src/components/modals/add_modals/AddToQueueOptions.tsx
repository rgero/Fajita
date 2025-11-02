import { AddCircle, CheckBox, CheckBoxOutlineBlank, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Grid, Typography } from "@mui/material"

import Button from '../../ui/Button';
import InfoSection from '../ui/InfoSection';
import { Priority } from '@interfaces/Priority';
import { Visibility } from '@interfaces/Visibility';
import VisibilityGroup from "../../ui/VisibilityGroup"
import toast from 'react-hot-toast';
import { useQueueProvider } from '@context/queue/QueueContext';
import { useSettings } from '@context/settings/SettingsContext';
import { useStashProvider } from '@context/stash/StashContext';

interface AddToQueueOptionsProps {
  children?: React.ReactNode;
  priority: Priority;
  selectedVisibility: Visibility;
  setVisibility: (visibility: Visibility) => void;
  videoData: { id: string };
  runChecksAndSubmit: () => void;
  handleToggle: () => void;
}

const AddToQueueOptions: React.FC<AddToQueueOptionsProps> = ({children = null, priority, selectedVisibility, setVisibility, videoData, runChecksAndSubmit, handleToggle}) => {
  const {isInStash, addVideoToStash, deleteVideoFromStash} = useStashProvider();
  const {isInQueue, getCurrentIndex, getVideoIndexInQueue} = useQueueProvider();
  const {enableExperimental} = useSettings();
  const inQueue: boolean = isInQueue(videoData.id);

  const processStash = async () => {
    try {
      if (isInStash(videoData.id)) {
        await deleteVideoFromStash(videoData.id);
        toast.success("Video Removed from Stash");
      } else {
        await addVideoToStash(videoData.id);
        toast.success("Video Added to Stash");
      }
    } catch {
      toast.error("Error Stashing Video");
    }
  }

  if (inQueue) {
    
  }

  return (
    <InfoSection>
      {inQueue && enableExperimental && (
        <Grid size={12} sx={{paddingTop: 1}}>
          <Typography align="center">Video already in queue.</Typography>

          {(() => {
            const currentIndex = getCurrentIndex();
            const queueIndex = getVideoIndexInQueue(videoData.id);
            const diff = currentIndex - queueIndex;
            const tense = diff > 0 ? "was" : "is";
            const direction = diff > 0 ? "ago" : "from now";

            return (
              <Typography align="center">
                It {tense} {Math.abs(diff)} video{Math.abs(diff) === 1 ? "" : "s"} {direction}.
              </Typography>
            );
          })()}
          
        </Grid>
      )}
      <Grid size={12}>
        <VisibilityGroup selected={selectedVisibility} setSelected={setVisibility}/>
      </Grid>
      <Grid size={12} container justifyContent={"space-between"} sx={{paddingTop: 1}}>
        {children ? (
          <Grid>
            <Grid container direction="row" spacing={1} alignItems="center">
              {children}
            </Grid>
          </Grid>
        ) : (
          <Grid>
            <Button onClick={processStash} icon={isInStash(videoData.id) ? <Favorite/> : <FavoriteBorder/>} title="Stash" color={isInStash(videoData.id) ? "error" : "default"}/>
          </Grid>
        )}
        <Grid>
          <Grid container direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
            <Grid>
              <Button onClick={handleToggle} icon={priority === Priority.playNext ? <CheckBox/> : <CheckBoxOutlineBlank/>} title="Play Next"/>
            </Grid>
            <Grid>
              <Button onClick={runChecksAndSubmit} icon={(<AddCircle/>)} title="Add" color="success"/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </InfoSection>
  )
}

export default AddToQueueOptions
