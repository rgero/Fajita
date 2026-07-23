import AddToQueueOptions from './AddToQueueOptions';
import { Stack } from '@mui/material';
import Modal from '../Modal';
import NoQueueAddOptions from './NoQueueAddOptions';
import PlayNextWarning from '../ui/PlayNextWarning';
import SubmittingSpinner from '../ui/SubmittingSpinner';
import VideoCard from '../../ui/VideoCard';
import useAddToQueue from './hooks/useAddToQueue';
import { useCallback } from 'react';
import { useModalContext } from '@context/modal/ModalContext';
import { useQueueContext } from '@context/queue/QueueContext';
import { useSearchContext } from '@context/search/SearchContext';

const AddToQueueModal: React.FC = () => {
  const { addToQueueModalOpen, toggleAddToQueueModalOpen } = useModalContext();
  const { isConnected, queueData } = useQueueContext();
  const { selectedResult, setSelectedResult } = useSearchContext();

  const targetID = selectedResult ? "video" in selectedResult ? selectedResult.video.video_id : selectedResult.id : null;

  const handleClose = useCallback(() => {
    setSelectedResult(null);
    toggleAddToQueueModalOpen();
  }, [setSelectedResult, toggleAddToQueueModalOpen]);

  const { isSubmitting, playNextCondition, submit, cleanUpAndClose, priority, visibility, setVisibility, togglePlayNext } = useAddToQueue(targetID, handleClose);

  const isQueueLocked = queueData?.locked ?? false;

  const displayObject = () => {
    if (isSubmitting) return <SubmittingSpinner />;
    if (playNextCondition !== undefined && playNextCondition !== null && playNextCondition !== 0) {
      return <PlayNextWarning handleSubmit={submit} />;
    }

    return (
      <AddToQueueOptions
        targetID={targetID}
        isQueueLocked={isQueueLocked}
        priority={priority}
        selectedVisibility={visibility}
        setVisibility={setVisibility}
        handleSubmit={submit}
        handleToggle={togglePlayNext}
      />
    );
  };

  return (
    <Modal open={addToQueueModalOpen} closeFn={cleanUpAndClose}>
      <Stack>
        {selectedResult && <VideoCard data={selectedResult} />}
        {isConnected ? displayObject() : <NoQueueAddOptions/>}
      </Stack>
    </Modal>
  );
};

export default AddToQueueModal;
