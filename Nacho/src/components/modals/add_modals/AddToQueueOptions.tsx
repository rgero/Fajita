import { AddCircle, CheckBox, CheckBoxOutlineBlank, Lock } from '@mui/icons-material';

import Button from '../../ui/Buttons/Button';
import { Grid } from "@mui/material";
import InfoSection from '../ui/InfoSection';
import { PlayNextCondition } from '../interfaces/PlayNextCondition';
import { Priority } from '@interfaces/Priority';
import QueuePositionMessage from './ui/QueuePositionMessage';
import ShareButtons from '../../ui/Buttons/ShareButtons';
import StashButton from '../../ui/Buttons/StashButton';
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

const AddToQueueOptions: React.FC<AddToQueueOptionsProps> = ({
  targetID, 
  isQueueLocked, 
  priority, 
  selectedVisibility, 
  setVisibility, 
  handleSubmit, 
  handleToggle, 
  disabled = false
}) => {
  const isPlayNext = priority === Priority.playNext;

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
            {!isQueueLocked ? (
              <>
                <Grid>
                  <Button 
                    onClick={() => {
                      if (!disabled) handleToggle();
                    }} 
                    icon={
                      isPlayNext ? (
                        <CheckBox color={disabled ? "disabled" : "inherit"} />
                      ) : (
                        <CheckBoxOutlineBlank color={disabled ? "disabled" : "inherit"} />
                      )
                    } 
                    title="Play Next" 
                    disabled={disabled}
                  />
                </Grid>
                <Grid>
                  <Button 
                    onClick={() => {
                      if (!disabled) handleSubmit();
                    }} 
                    icon={<AddCircle color={disabled ? "disabled" : "success"} />} 
                    title="Add" 
                    color={disabled ? "default" : "success"} 
                    disabled={disabled}
                  />
                </Grid>
              </>
            ) : (
              <Grid>
                  <Button 
                    onClick={() => null} 
                    icon={<Lock color="disabled" />} 
                    title="Locked" 
                    color="grey"
                    disabled={true}
                  />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </InfoSection>
  );
};

export default AddToQueueOptions;