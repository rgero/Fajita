import { AddCircle, CheckBox, CheckBoxOutlineBlank, Favorite, FavoriteBorder, Share, YouTube } from '@mui/icons-material';
import { Grid, Typography } from "@mui/material"

import Button from '../../ui/Button';
import InfoSection from '../ui/InfoSection';
import { OpenYouTubeURL } from '@utils/OpenYoutubeURL';
import { PlayNextCondition } from '../interfaces/PlayNextCondition';
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
  handleSubmit: (acceptedCondition?: PlayNextCondition) => void;
  handleToggle: () => void;
}

const AddToQueueOptions: React.FC<AddToQueueOptionsProps> = ({priority, selectedVisibility, setVisibility, handleSubmit, handleToggle}) => {
  const {isInStash, addVideoToStash, deleteVideoFromStash} = useStashContext();
  const {isInQueue, queueData, getVideoIndexInQueue} = useQueueContext();
  const {selectedResult} = useSearchContext();
  const {shareOptions} = useSettings();

  if (!selectedResult) return;

  const targetID = "video" in selectedResult ? selectedResult.video.video_id : selectedResult.id;

  const processStash = async () => {
    try {
      if (isInStash(targetID)) {
        await deleteVideoFromStash(targetID);
        toast.success("Video Removed from Stash");
      } else {
        await addVideoToStash(targetID);
        toast.success("Video Added to Stash");
      }
    } catch {
      toast.error("Error Stashing Video");
    }
  }

  return (
    <InfoSection>
      {isInQueue(targetID) && (
        <Grid size={12} sx={{paddingTop: 1}}>
          <Typography align="center" color="warning" fontWeight="bold">Video already in queue.</Typography>

          {(() => {
            const currentIndex = queueData.current_index;
            const queueIndex = getVideoIndexInQueue(targetID);
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
                <Button onClick={()=> copyVideoIDToClipboard(targetID)} icon={(<Share/>)} title="Copy"/>
              </Grid>
            ) : null }
            {shareOptions.youtube ? (
              <Grid>
                <Button onClick={() => OpenYouTubeURL(targetID)} icon={(<YouTube color="error"/>)} title="YouTube"/>
              </Grid>   
            ) : null }
            <Grid>
              <Button onClick={processStash} icon={isInStash(targetID) ? <Favorite/> : <FavoriteBorder/>} title="Stash" color={isInStash(targetID) ? "error" : "default"}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Grid container direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
            <Grid>
              <Button onClick={handleToggle} icon={priority === Priority.playNext ? <CheckBox/> : <CheckBoxOutlineBlank/>} title="Play Next"/>
            </Grid>
            <Grid>
              <Button onClick={()=> handleSubmit()} icon={(<AddCircle/>)} title="Add" color="success"/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </InfoSection>
  )
}

export default AddToQueueOptions
