import AddToQueueOptions from './ui/AddToQueueOptions';
import { Grid } from '@mui/material';
import IsInQueueWarning from './ui/IsInQueueWarning';
import Modal from './Modal';
import { PlayNextCondition } from './interfaces/PlayNextCondition';
import PlayNextWarning from './ui/PlayNextWarning';
import { Priority } from '../../interfaces/Priority';
import SubmittingSpinner from './ui/SubmittingSpinner';
import VideoCard from '../ui/VideoCard';
import { Visibility } from '../../interfaces/Visibility';
import { YoutubeResponse } from "../../interfaces/YoutubeResponse";
import toast from 'react-hot-toast';
import { useQueueProvider } from '../../context/queue/QueueContext';
import { useState } from 'react';

interface Props {
  open: boolean,
  videoData: YoutubeResponse,
  closeFn: () => void,
  children? : React.ReactNode
}

const AddToQueueModal: React.FC<Props> = ({open, videoData, closeFn, children}) => {
  const [priority, setPriority] = useState<Priority>(Priority.normal);
  const [selectedVisibility, setVisibility] = useState<number>(Visibility.Normal);
  const {addVideoToQueue, checkForPlayNext, isInQueue} = useQueueProvider();
  const [playNextCondition, setPlayNextCondition] = useState<PlayNextCondition>(PlayNextCondition.None);
  const [confirmationNeeded, setConfirmationNeeded] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const cleanUpAndClose = () => {
    setPriority(Priority.normal);
    setVisibility(Visibility.Normal);
    setPlayNextCondition(PlayNextCondition.None);
    setConfirmationNeeded(false);
    closeFn();
  }

  const runChecksAndSubmit = async () => {
    const playNext: boolean = await checkPlayNext();
    const inQueue: boolean = await isInQueue(videoData.id);

    if (playNext || inQueue)
    {
      setConfirmationNeeded(true);
    } else {
      handleSubmit(PlayNextCondition.None);
    }
  }

  const checkPlayNext = async () => {
    let needPermission = false;
    if (priority != Priority.normal && playNextCondition == PlayNextCondition.None)
    {
      needPermission = await checkForPlayNext();
      if (needPermission)
      {
        setPlayNextCondition(PlayNextCondition.Need);
      }
    }
    return needPermission;
  }

  const handleInQueue = async (accepted: boolean) => {
    if (accepted)
    {
      setConfirmationNeeded(false);
      handleSubmit(PlayNextCondition.None);
    } else {
      cleanUpAndClose();
    }
  }

  const handleSubmit = async (acceptedCondition : PlayNextCondition) => {
    // If at this point, we're submitting.
    setIsSubmitting(true);
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
      cleanUpAndClose();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to add video");
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  
  const handleToggle = () => {
    setPriority( (prevState) => { return prevState === Priority.playNext ? Priority.normal : Priority.playNext; });
  }

  const displayObject = () => {
    if (isSubmitting)
    {
      return <SubmittingSpinner/>;
    }
    if (playNextCondition != PlayNextCondition.None)
    {
      return <PlayNextWarning handleSubmit={handleSubmit}/>
    }

    if (confirmationNeeded)
    {
      return <IsInQueueWarning handleInQueue={handleInQueue}/>
    }

    return <AddToQueueOptions
      children={children}
      priority={priority} 
      selectedVisibility={selectedVisibility} 
      setVisibility={setVisibility} 
      videoData={videoData} 
      runChecksAndSubmit={runChecksAndSubmit} 
      handleToggle={handleToggle}
    />
  }

  return (
    <Modal
      open={open}
      closeFn={cleanUpAndClose}
    >
      <Grid container direction="column">
        <VideoCard data={videoData}/>
        {displayObject()}
      </Grid>
    </Modal>
  )
}

export default AddToQueueModal
