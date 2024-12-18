<<<<<<< HEAD:YouTubeQueuer/src/components/Search/modals/AddToQueueModal.tsx
import { AddCircle, CheckBox, CheckBoxOutlineBlank, SelfImprovement, Speed, Star } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';

import FajitaButton from '../../ui/Button';
=======
import { AddCircle, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

import FajitaButton from '../../ui/Button';
import { Grid } from '@mui/material';
>>>>>>> main:Nacho/src/components/Search/modals/AddToQueueModal.tsx
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

<<<<<<< HEAD:YouTubeQueuer/src/components/Search/modals/AddToQueueModal.tsx
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
  
  const handleToggle = () =>
  {
    setPriority( (prevState) => { return prevState === Priority.normal ? Priority.playNext : Priority.normal });
=======
  const handleToggle = () => 
  {
    setPlayNext(!playNext);
>>>>>>> main:Nacho/src/components/Search/modals/AddToQueueModal.tsx
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
<<<<<<< HEAD:YouTubeQueuer/src/components/Search/modals/AddToQueueModal.tsx
              <VisibilityGroup selected={selectedVisibility} setSelected={setSelected}/>
            </Grid>
            <Grid container direction="row" justifyContent="flex-end" spacing={3} alignItems="center" sx={{paddingTop: 2}}>
              <Grid item>
                <FajitaButton onClick={handleToggle} icon={priority != Priority.normal ? <CheckBox color="success"/> : <CheckBoxOutlineBlank/>} title="Play Next"/>
              </Grid>
              <Grid item>
                <FajitaButton onClick={checkPlayNext} icon={(<AddCircle color="success"/>)} title="Add"/>
              </Grid>
=======
              <FajitaButton onClick={handleToggle} icon={playNext ? <CheckBox color="success"/> : <CheckBoxOutlineBlank/>} title="Play Next"/>
            </Grid>
            <Grid item>
              <FajitaButton onClick={handleSubmit} icon={(<AddCircle color="success"/>)} title="Add"/>
>>>>>>> main:Nacho/src/components/Search/modals/AddToQueueModal.tsx
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
