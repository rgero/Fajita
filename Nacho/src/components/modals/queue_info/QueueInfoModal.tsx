import { useCallback, useMemo, useState } from 'react';

import Modal from '../Modal';
import { ProcessVideo } from '@utils/SecretVideoProcessor';
import QueueInfoButton from '@components/queue/QueueInfoButton';
import QueueInfoButtons from './QueueInfoButtons';
import VideoCard from '@components/ui/VideoCard';
import { YoutubeResponse } from '@interfaces/YoutubeResponse';
import toast from 'react-hot-toast';
import { useModalContext } from '@context/modal/ModalContext';
import { useQueueContext } from '@context/queue/QueueContext';
import { useSocketProvider } from '@context/websocket/WebsocketContext';

const QueueInfoModal = () => {
  const { queueInfoModalOpen, toggleQueueInfoModalOpen } = useModalContext();
  const { currentlySelected, deleteVideoFromQueue, queueData } = useQueueContext();
  const { jumpQueue } = useSocketProvider();

  const [checkDelete, setConfirmDelete] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const checkConfirm = useCallback((isDeleting: boolean) => {
    setIsFadingOut(true);
    setTimeout(() => {
      setConfirmDelete(isDeleting);
      setIsFadingOut(false);
    }, 300);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!currentlySelected) return;
    try {
      await deleteVideoFromQueue(currentlySelected.id);
      setConfirmDelete(false);
      toast.success("Video deleted from queue");
      toggleQueueInfoModalOpen();
    } catch {
      toast.error("Failed to delete video");
    }
  }, [currentlySelected, deleteVideoFromQueue, toggleQueueInfoModalOpen]);

  const jumpVideo = useCallback(
    (index: number) => {
      jumpQueue(index);
      toggleQueueInfoModalOpen();
    },
    [jumpQueue, toggleQueueInfoModalOpen]
  );

  const status = useMemo(() => {
    if (!currentlySelected) return null;
    return ProcessVideo(currentlySelected, queueData.current_index);
  }, [currentlySelected, queueData.current_index]);

  const videoData: YoutubeResponse | null = useMemo(() => {
    if (!currentlySelected || !status) return null;

    return {
      id: currentlySelected.video.video_id,
      title: status.isVisible ? currentlySelected.video.title : status.message ?? "No title",
      thumbnail_src: status.isVisible ? currentlySelected.video.thumbnail : status.cover ?? "BlackBox.png",
      duration: currentlySelected.video.duration,
    };
  }, [currentlySelected,status]);

  if (!currentlySelected || !status || !videoData) {
    return null;
  }

  return (
    <Modal open={queueInfoModalOpen} closeFn={toggleQueueInfoModalOpen}>
      <>
        <VideoCard data={videoData} />

        <QueueInfoButtons
          checkDelete={checkDelete}
          isFadingOut={isFadingOut}
          status={status}
          currentlySelected={currentlySelected}
          checkConfirm={checkConfirm}
          jumpVideo={jumpVideo}
          handleDelete={handleDelete}
        />

        <QueueInfoButton
          interaction={currentlySelected}
          disableHanded={false}
          smallButton={false}
          offset={"22px"}
        />
      </>
    </Modal>
  );
};

export default QueueInfoModal;
