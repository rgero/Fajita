import { Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { SelfImprovement, Speed, Star } from '@mui/icons-material';

import FajitaButton from "../../ui/Button"
import Modal from '../../ui/Modal';
import { Priority } from '../../../interfaces/Priority';
import VideoCard from '../../ui/VideoCard';
import { Visibility } from '../../../interfaces/Visibility';
import VisibilityGroup from '../../ui/VisibilityGroup';
import { YoutubeResponse } from "../../../interfaces/YoutubeResponse";
import { useQueueProvider } from '../../../context/QueueContext';
import { useState } from 'react';

interface Props {
  open: boolean,
  videoData: YoutubeResponse,
  closeFn: () => void
}

enum PlayNextCondition {
  None,
  Need,
  Accepted,
  Rejected,
  Impatient
}

const AddToQueueModal: React.FC<Props> = ({open, videoData, closeFn}) => {
  const [priority, setPriority] = useState<Priority>(Priority.normal);
  const [selectedVisibility, setSelected] = useState<number>(Visibility.Normal);
  const {addVideoToQueue, checkForPlayNext} = useQueueProvider();

  const [playNextCondition, setPlayNextCondition] = useState<PlayNextCondition>(PlayNextCondition.None);

  const cleanUpAndClose = () => {
    setPriority(Priority.normal);
    setPlayNextCondition(PlayNextCondition.None);
    closeFn();
  }

  const checkPlayNext = async () => {
    if (priority != Priority.normal && playNextCondition == PlayNextCondition.None)
    {
      const needPermission = await checkForPlayNext();
      if (needPermission)
      {
        setPlayNextCondition(PlayNextCondition.Need);
        return;
      }
    }
    handleSubmit(PlayNextCondition.None);
  }

  const handleSubmit = async (acceptedCondition : PlayNextCondition) => {
    if (acceptedCondition == PlayNextCondition.Need)
    {
      return;
    }

    // If at this point, we're submitting.
    let targetPriority: Priority = priority;
    if (acceptedCondition == PlayNextCondition.Accepted)
    {
      targetPriority = Priority.playNext;
    } else if (acceptedCondition == PlayNextCondition.Rejected)
    {
      targetPriority = Priority.normal;
    } else if (acceptedCondition == PlayNextCondition.Impatient)
    {
      targetPriority = Priority.impatient;
    } else if (acceptedCondition == PlayNextCondition.None) {
      targetPriority = priority;
    } else {
      console.error("Something went wrong with the play next conditions.");
      return;
    }

    setPriority(Priority.normal);
    setPlayNextCondition(PlayNextCondition.None);
    addVideoToQueue(videoData.id, targetPriority, selectedVisibility);
    closeFn();
  }
  
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setPriority(event.target.checked ? Priority.playNext : Priority.normal);
  }

  return (
    <Modal
      open={open}
      closeFn={cleanUpAndClose}
    >
      <Grid container direction="column">
        <VideoCard data={videoData}/>
        {playNextCondition == PlayNextCondition.None ? (
          <Grid item>
            <Grid item>
              <VisibilityGroup selected={selectedVisibility} setSelected={setSelected}/>
            </Grid>
            <Grid container direction="row" justifyContent="flex-end" spacing={3} alignItems="center" sx={{paddingTop: 2}}>
              <Grid item>
                <FormControlLabel 
                  labelPlacement="start" 
                  control={<Checkbox onChange={handleToggle} value={priority === Priority.playNext}/>} 
                  label="Play Next?" 
                />
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={checkPlayNext} color="success">Add</Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item>
            <Grid container direction="column" spacing={2} sx={{padding: 2}}>
              <Grid item alignSelf={"center"}>
                <Typography variant="h6">Warning: Someone has used their play next.</Typography>
              </Grid>
              <Grid item>
                <Grid container justifyContent={"space-around"}>
                  <FajitaButton onClick={() => handleSubmit(PlayNextCondition.Rejected)} icon={<Speed/>} title="Regular"/>
                  <FajitaButton onClick={() => handleSubmit(PlayNextCondition.Accepted)} icon={<SelfImprovement color="warning"/>} title="Play Next"/>
                  <FajitaButton onClick={() => handleSubmit(PlayNextCondition.Impatient)} icon={<Star color="success"/>} title="Me First!"/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Modal>
  )
}

export default AddToQueueModal
