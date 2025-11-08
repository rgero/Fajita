import AddToQueueOptions from './AddToQueueOptions';
import { Grid } from '@mui/material';
import IsInQueueWarning from '../ui/IsInQueueWarning';
import Modal from '../Modal';
import { PlayNextCondition } from '../interfaces/PlayNextCondition';
import PlayNextWarning from '../ui/PlayNextWarning';
import { Priority } from '@interfaces/Priority';
import SubmittingSpinner from '../ui/SubmittingSpinner';
import VideoCard from '../../ui/VideoCard';
import { Visibility } from '@interfaces/Visibility';
import toast from 'react-hot-toast';
import { useModalContext } from '@context/modal/ModalContext';
import { useQueueContext } from '@context/queue/QueueContext';
import { useSearchContext } from '@context/search/SearchContext';
import { useSettings } from '@context/settings/SettingsContext';
import { useState } from 'react';

const AddToQueueModal = () => {
  const [priority, setPriority] = useState<Priority>(Priority.normal);
  const [selectedVisibility, setVisibility] = useState<number>(Visibility.Normal);
  const {addVideoToQueue, checkForPlayNext, isInQueue} = useQueueContext();
  const {enableExperimental} = useSettings();
  const [playNextCondition, setPlayNextCondition] = useState<PlayNextCondition>(PlayNextCondition.None);
  const [confirmationNeeded, setConfirmationNeeded] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {addToQueueModalOpen, toggleAddToQueueModalOpen} = useModalContext();
  const {selectedResult, setSelectedResult} = useSearchContext();

  const cleanUpAndClose = () => {
    setPriority(Priority.normal);
    setVisibility(Visibility.Normal);
    setPlayNextCondition(PlayNextCondition.None);
    setConfirmationNeeded(false);
    setSelectedResult(null);
    toggleAddToQueueModalOpen();
  }

  const runChecksAndSubmit = async () => {
    if (!selectedResult) { return; }
    const playNext: boolean = await checkPlayNext();
    const inQueue: boolean = await isInQueue(selectedResult.id);

    if (playNext)
    {
      setConfirmationNeeded(true);
    } else if (inQueue && !enableExperimental) {
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
    if (!selectedResult) return;

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
      await addVideoToQueue({id: selectedResult.id, priority: targetPriority, visibility: selectedVisibility});
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

    if (confirmationNeeded && !enableExperimental )
    {
      return <IsInQueueWarning handleInQueue={handleInQueue}/>
    }

    return <AddToQueueOptions
      priority={priority} 
      selectedVisibility={selectedVisibility} 
      setVisibility={setVisibility} 
      runChecksAndSubmit={runChecksAndSubmit} 
      handleToggle={handleToggle}
    />
  }

  return (
    <Modal
      open={addToQueueModalOpen}
      closeFn={cleanUpAndClose}
    >
      <Grid container direction="column">
        <VideoCard data={selectedResult}/>
        {displayObject()}
      </Grid>
    </Modal>
  )
}

export default AddToQueueModal
