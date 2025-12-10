import { AddCircle, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

import Button from '../../ui/Button';
import { Grid } from "@mui/material";
import InfoSection from '../ui/InfoSection';
import { PlayNextCondition } from '../interfaces/PlayNextCondition';
import { Priority } from '@interfaces/Priority';
import QueuePositionMessage from './ui/QueuePositionMessage';
import ShareButtons from './ui/ShareButtons';
import StashButton from './ui/StashButton';
import { Visibility } from '@interfaces/Visibility';
import VisibilityGroup from "../../ui/VisibilityGroup";
import { useSearchContext } from '@context/search/SearchContext';

interface AddToQueueOptionsProps {
  priority: Priority;
  selectedVisibility: Visibility;
  setVisibility: (visibility: Visibility) => void;
  handleSubmit: (acceptedCondition?: PlayNextCondition) => void;
  handleToggle: () => void;
}

const AddToQueueOptions: React.FC<AddToQueueOptionsProps> = ({priority, selectedVisibility, setVisibility, handleSubmit, handleToggle}) => {
  const { selectedResult } = useSearchContext();

  if (!selectedResult) return null;

  const targetID = "video" in selectedResult ? selectedResult.video.video_id : selectedResult.id;

  return (
    <InfoSection>
      <QueuePositionMessage targetID={targetID} />
      <Grid size={12}>
        <VisibilityGroup selected={selectedVisibility} setSelected={setVisibility}/>
      </Grid>
      <Grid size={12} container justifyContent={"space-between"} sx={{paddingTop: 1}}>
        <Grid>
          <Grid container direction="row" spacing={1} alignItems="center">
            <ShareButtons targetID={targetID} />
            <StashButton targetID={targetID} />
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
  );
};

export default AddToQueueOptions;
