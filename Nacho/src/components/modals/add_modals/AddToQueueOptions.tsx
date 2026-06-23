import { AddCircle, CheckBox, CheckBoxOutlineBlank, Lock } from '@mui/icons-material';

import Button from '../../ui/Button';
import { Grid } from "@mui/material";
import InfoSection from '../ui/InfoSection';
import { PlayNextCondition } from '../interfaces/PlayNextCondition';
import { Priority } from '@interfaces/Priority';
import QueuePositionMessage from './ui/QueuePositionMessage';
import ShareButtons from '../../ui/ShareButtons';
import StashButton from './ui/StashButton';
import { Visibility } from '@interfaces/Visibility';
import VisibilityGroup from "../../ui/VisibilityGroup";
import { useQueueContext } from '@context/queue/QueueContext';
import { useSearchContext } from '@context/search/SearchContext';

interface AddToQueueOptionsProps {
  priority: Priority;
  selectedVisibility: Visibility;
  setVisibility: (visibility: Visibility) => void;
  handleSubmit: (acceptedCondition?: PlayNextCondition) => void;
  handleToggle: () => void;
}

const AddToQueueOptions: React.FC<AddToQueueOptionsProps> = ({priority, selectedVisibility, setVisibility, handleSubmit, handleToggle}) => {
  const {queueData} = useQueueContext()
  const { selectedResult } = useSearchContext();

  if (!selectedResult) return null;

  const isQueueLocked = queueData ? queueData.locked : false;

  const targetID = "video" in selectedResult ? selectedResult.video.video_id : selectedResult.id;

  return (
    <InfoSection>
      <QueuePositionMessage targetID={targetID} />
      <Grid size={12}>
        <VisibilityGroup selected={selectedVisibility} setSelected={setVisibility}/>
      </Grid>
      <Grid size={12} container sx={{ justifyContent: "space-between", paddingTop: 1 }}>
        <Grid>
          <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <ShareButtons targetID={targetID} />
            <StashButton targetID={targetID} />
          </Grid>
        </Grid>

        <Grid>
          <Grid container spacing={1} sx={{ justifyContent: "flex-end", alignItems: "center" }}>
            {!isQueueLocked && (
              <Grid>
                <Button onClick={handleToggle} icon={priority === Priority.playNext ? <CheckBox/> : <CheckBoxOutlineBlank/>} title="Play Next"/>
              </Grid>
            )}
            <Grid>
              {!isQueueLocked ? <Button onClick={()=> handleSubmit()} icon={(<AddCircle/>)} title="Add" color="success"/> : <Button onClick={()=> null} icon={(<Lock/>)} title="Locked" color="grey"/>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </InfoSection>
  );
};

export default AddToQueueOptions;
