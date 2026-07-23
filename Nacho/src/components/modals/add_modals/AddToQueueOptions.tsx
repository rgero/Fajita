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

interface AddToQueueOptionsProps {
  targetID: string | null;
  isQueueLocked: boolean;
  priority: Priority;
  selectedVisibility: Visibility;
  setVisibility: (visibility: Visibility) => void;
  handleSubmit: (acceptedCondition?: PlayNextCondition) => void;
  handleToggle: () => void;
  disabled?: boolean;
}

const AddToQueueOptions: React.FC<AddToQueueOptionsProps> = ({targetID, isQueueLocked, priority, selectedVisibility, setVisibility, handleSubmit, handleToggle, disabled = false}) => {

  return (
    <InfoSection>
      {targetID && <QueuePositionMessage targetID={targetID} />}
      <Grid size={12}>
        <VisibilityGroup selected={selectedVisibility} setSelected={setVisibility} disabled={disabled}/>
      </Grid>
      <Grid size={12} container sx={{ justifyContent: "space-between", paddingTop: 1 }}>
        <Grid>
          <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <ShareButtons targetID={targetID ?? ""} disabled={disabled || !targetID} />
            <StashButton targetID={targetID ?? ""} disabled={disabled || !targetID} />
          </Grid>
        </Grid>

        <Grid>
          <Grid container spacing={1} sx={{ justifyContent: "flex-end", alignItems: "center" }}>
            {!isQueueLocked && (
              <Grid>
                <Button onClick={handleToggle} icon={priority === Priority.playNext ? <CheckBox/> : <CheckBoxOutlineBlank/>} title="Play Next" disabled={disabled}/>
              </Grid>
            )}
            <Grid>
              {!isQueueLocked ? <Button onClick={()=> handleSubmit()} icon={(<AddCircle/>)} title="Add" color="success" disabled={disabled}/> : <Button onClick={()=> null} icon={(<Lock/>)} title="Locked" color="grey"/>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </InfoSection>
  );
};

export default AddToQueueOptions;
