import AddToQueueOptions from './AddToQueueOptions';
import { Grid } from '@mui/material';
import Modal from '../Modal';
import NoQueueAddOptions from './NoQueueAddOptions';
import PlayNextWarning from '../ui/PlayNextWarning';
import SubmittingSpinner from '../ui/SubmittingSpinner';
import VideoCard from '../../ui/VideoCard';
import useAddToQueue from './hooks/useAddToQueue';
import { useModalContext } from '@context/modal/ModalContext';
import { useQueueContext } from '@context/queue/QueueContext';

const AddToQueueModal: React.FC = () => {
  const { addToQueueModalOpen } = useModalContext();
  const {isConnected} = useQueueContext();
  const {selectedResult, isSubmitting, playNextCondition, submit, cleanUpAndClose, priority, visibility, setVisibility, togglePlayNext} = useAddToQueue();

  const displayObject = () => {
    if (isSubmitting) return <SubmittingSpinner />;
    if (playNextCondition !== undefined && playNextCondition !== null && playNextCondition !== 0) {
      return <PlayNextWarning handleSubmit={submit} />;
    }

    return (
      <AddToQueueOptions
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
      <Grid container direction="column">
        <VideoCard data={selectedResult} />
        {isConnected ? displayObject() : <NoQueueAddOptions/>}
      </Grid>
    </Modal>
  );
};

export default AddToQueueModal;
