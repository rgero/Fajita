import AddToQueueOptions from './AddToQueueOptions';
import { Grid } from '@mui/material';
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
import { useState } from 'react';

const AddToQueueModal = () => {
  const [priority, setPriority] = useState<Priority>(Priority.normal);
  const [selectedVisibility, setVisibility] = useState<number>(Visibility.Normal);
  const { addVideoToQueue, checkForPlayNext } = useQueueContext();
  const [playNextCondition, setPlayNextCondition] = useState<PlayNextCondition>(PlayNextCondition.None);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { addToQueueModalOpen, toggleAddToQueueModalOpen } = useModalContext();
  const { selectedResult, setSelectedResult } = useSearchContext();

  const cleanUpAndClose = () => {
    setPriority(Priority.normal);
    setVisibility(Visibility.Normal);
    setPlayNextCondition(PlayNextCondition.None);
    setSelectedResult(null);
    toggleAddToQueueModalOpen();
  };

  const handleSubmit = async (acceptedCondition: PlayNextCondition = PlayNextCondition.None) => {
    if (!selectedResult) return;

    // Step 1: Check if we need play-next permission first
    if (priority !== Priority.normal && playNextCondition === PlayNextCondition.None && acceptedCondition === PlayNextCondition.None) {
      const needPermission = await checkForPlayNext();
      if (needPermission) {
        setPlayNextCondition(PlayNextCondition.Need);
        return;
      }
    }

    // Step 2: Proceed with submission
    setIsSubmitting(true);
    let targetPriority = priority;

    switch (acceptedCondition) {
      case PlayNextCondition.Accepted:
        targetPriority = Priority.playNext;
        break;
      case PlayNextCondition.Rejected:
        targetPriority = Priority.normal;
        break;
      case PlayNextCondition.Impatient:
        targetPriority = Priority.impatient;
        break;
      case PlayNextCondition.None:
        targetPriority = priority;
        break;
      default:
        console.error("Unexpected PlayNextCondition encountered.");
        setIsSubmitting(false);
        return;
    }

    try {
      const targetID = "video" in selectedResult ? selectedResult.video.video_id : selectedResult.id;
      await addVideoToQueue({
        id: targetID,
        priority: targetPriority,
        visibility: selectedVisibility,
      });
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
      setPriority(Priority.normal);
      setPlayNextCondition(PlayNextCondition.None);
    }
  };

  const handleToggle = () => {
    setPriority((prev) =>
      prev === Priority.playNext ? Priority.normal : Priority.playNext
    );
  };

  const displayObject = () => {
    if (isSubmitting) return <SubmittingSpinner />;
    if (playNextCondition !== PlayNextCondition.None)
      return <PlayNextWarning handleSubmit={handleSubmit} />;

    return (
      <AddToQueueOptions
        priority={priority}
        selectedVisibility={selectedVisibility}
        setVisibility={setVisibility}
        handleSubmit={handleSubmit}
        handleToggle={handleToggle}
      />
    );
  };

  return (
    <Modal open={addToQueueModalOpen} closeFn={cleanUpAndClose}>
      <Grid container direction="column">
        <VideoCard data={selectedResult} />
        {displayObject()}
      </Grid>
    </Modal>
  );
};

export default AddToQueueModal;
