import { AddCircle, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

import FajitaButton from "../../ui/Button"
import { Grid } from '@mui/material';
import Modal from '../../ui/Modal';
import { PlayNextCondition } from '../interfaces/PlayNextCondition';
import PlayNextWarning from '../ui/PlayNextWarning';
import { Priority } from '../../../interfaces/Priority';
import VideoCard from '../../ui/VideoCard';
import { Visibility } from '../../../interfaces/Visibility';
import VisibilityGroup from '../../ui/VisibilityGroup';
import { YoutubeResponse } from "../../../interfaces/YoutubeResponse";
import toast from 'react-hot-toast';
import { useQueueProvider } from '../../../context/QueueContext';
import { useState } from 'react';

interface Props {
  open: boolean,
  videoData: YoutubeResponse,
  closeFn: () => void
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
    try {
      await addVideoToQueue({id: videoData.id, priority: targetPriority, visibility: selectedVisibility});
      toast.success("Video Added");
      closeFn();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to add video");
      }
    }
  }
  
  const handleToggle = () =>
  {
    setPriority( (prevState) => { return prevState === Priority.playNext ? Priority.normal : Priority.playNext; });
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
                <FajitaButton onClick={handleToggle} icon={priority === Priority.playNext ? <CheckBox color="success"/> : <CheckBoxOutlineBlank/>} title="Play Next"/>
              </Grid>
              <Grid item>
                <FajitaButton onClick={checkPlayNext} icon={(<AddCircle color="success"/>)} title="Add"/>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item>
            <PlayNextWarning handleSubmit={handleSubmit}/>
          </Grid>
        )}
      </Grid>
    </Modal>
  )
}

export default AddToQueueModal
