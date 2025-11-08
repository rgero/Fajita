import { AddCircle, CheckBox, CheckBoxOutlineBlank, Favorite, FavoriteBorder, Share, YouTube } from '@mui/icons-material';
import { Grid, Typography } from "@mui/material"

import Button from '../../ui/Button';
import InfoSection from '../ui/InfoSection';
import { OpenYouTubeURL } from '@utils/OpenYoutubeURL';
import { Priority } from '@interfaces/Priority';
import { Visibility } from '@interfaces/Visibility';
import VisibilityGroup from "../../ui/VisibilityGroup"
import { copyVideoIDToClipboard } from '@utils/CopyToClipboard';
import toast from 'react-hot-toast';
import { useQueueContext } from '@context/queue/QueueContext';
import { useSearchContext } from '@context/search/SearchContext';
import { useSettings } from '@context/settings/SettingsContext';
import { useStashContext } from '@context/stash/StashContext';

interface AddToQueueOptionsProps {
  priority: Priority;
  selectedVisibility: Visibility;
  setVisibility: (visibility: Visibility) => void;
  runChecksAndSubmit: () => void;
  handleToggle: () => void;
}

const AddToQueueOptions: React.FC<AddToQueueOptionsProps> = ({priority, selectedVisibility, setVisibility, runChecksAndSubmit, handleToggle}) => {
  const {isInStash, addVideoToStash, deleteVideoFromStash} = useStashContext();
  const {isInQueue, getCurrentIndex, getVideoIndexInQueue} = useQueueContext();
  const {selectedResult} = useSearchContext();
  const {shareOptions} = useSettings();
  const {enableExperimental} = useSettings();

  if (!selectedResult) return;

  const inQueue: boolean = isInQueue(selectedResult.id);

  const processStash = async () => {
    try {
      if (isInStash(selectedResult.id)) {
        await deleteVideoFromStash(selectedResult.id);
        toast.success("Video Removed from Stash");
      } else {
        await addVideoToStash(selectedResult.id);
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
            const queueIndex = getVideoIndexInQueue(selectedResult.id);
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
        <Grid>
          <Grid container direction="row" spacing={1} alignItems="center">
            {shareOptions.clipboard ? (
              <Grid>
                <Button onClick={()=> copyVideoIDToClipboard(selectedResult.id)} icon={(<Share/>)} title="Copy"/>
              </Grid>
            ) : null }
            {shareOptions.youtube ? (
              <Grid>
                <Button onClick={() => OpenYouTubeURL(selectedResult.id)} icon={(<YouTube color="error"/>)} title="YouTube"/>
              </Grid>   
            ) : null }
            <Grid>
              <Button onClick={processStash} icon={isInStash(selectedResult.id) ? <Favorite/> : <FavoriteBorder/>} title="Stash" color={isInStash(selectedResult.id) ? "error" : "default"}/>
            </Grid>
          </Grid>
        </Grid>
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
