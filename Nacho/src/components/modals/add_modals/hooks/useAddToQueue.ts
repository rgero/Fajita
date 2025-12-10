import { useCallback, useState } from "react";

import { PlayNextCondition } from "@components/modals/interfaces/PlayNextCondition";
import { Priority } from "@interfaces/Priority";
import { Visibility } from "@interfaces/Visibility";
import toast from "react-hot-toast";
import { useModalContext } from "@context/modal/ModalContext";
import { useQueueContext } from "@context/queue/QueueContext";
import { useSearchContext } from "@context/search/SearchContext";

type UseAddToQueueReturn = {
  priority: Priority;
  visibility: Visibility;
  playNextCondition: PlayNextCondition;
  isSubmitting: boolean;
  targetID?: string | null;
  selectedResult: any | null;
  setVisibility: (v: Visibility) => void;
  togglePlayNext: () => void;
  submit: (acceptedCondition?: PlayNextCondition) => Promise<void>;
  cleanUpAndClose: () => void;
  setPriority: (p: Priority) => void;
};

export function useAddToQueue(): UseAddToQueueReturn {
  const [priority, setPriority] = useState<Priority>(Priority.normal);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Normal);
  const [playNextCondition, setPlayNextCondition] = useState<PlayNextCondition>(PlayNextCondition.None);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addVideoToQueue, checkForPlayNext } = useQueueContext();
  const { toggleAddToQueueModalOpen } = useModalContext();
  const { selectedResult, setSelectedResult } = useSearchContext();

  const getTargetID = useCallback((): string | null => {
    if (!selectedResult) return null;
    return "video" in selectedResult ? selectedResult.video.video_id : selectedResult.id;
  }, [selectedResult]);

  const cleanUpAndClose = useCallback(() => {
    setPriority(Priority.normal);
    setVisibility(Visibility.Normal);
    setPlayNextCondition(PlayNextCondition.None);
    setIsSubmitting(false);
    setSelectedResult(null);
    if (toggleAddToQueueModalOpen) toggleAddToQueueModalOpen();
  }, [setSelectedResult, toggleAddToQueueModalOpen]);

  const togglePlayNext = useCallback(() => {
    setPriority((prev) => (prev === Priority.playNext ? Priority.normal : Priority.playNext));
  }, []);

  const submit = useCallback(
    async (acceptedCondition: PlayNextCondition = PlayNextCondition.None) => {
      const targetID = getTargetID();
      if (!targetID) return;

      // Step 1: Check permission if user toggled a non-normal priority
      if (
        priority !== Priority.normal &&
        playNextCondition === PlayNextCondition.None &&
        acceptedCondition === PlayNextCondition.None
      ) {
        try {
          const needPermission = await checkForPlayNext();
          if (needPermission) {
            setPlayNextCondition(PlayNextCondition.Need);
            return;
          }
        } catch (err) {
          console.error("Error checking play-next:", err);
          toast.error("Error checking play-next permissions");
          return;
        }
      }

      // Step 2: Resolve final priority based on acceptedCondition
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
        default:
          targetPriority = priority;
      }

      try {
        await addVideoToQueue({
          id: targetID,
          priority: targetPriority,
          visibility,
        });
        toast.success("Video Added");
        cleanUpAndClose();
      } catch (err) {
        console.error("Failed to add video to queue:", err);
        if (err instanceof Error) toast.error(err.message);
        else toast.error("Failed to add video");
      } finally {
        setIsSubmitting(false);
        setPriority(Priority.normal);
        setPlayNextCondition(PlayNextCondition.None);
      }
    },
    [getTargetID, priority, playNextCondition, checkForPlayNext, addVideoToQueue, visibility, cleanUpAndClose]
  );

  return {
    priority,
    visibility,
    playNextCondition,
    isSubmitting,
    targetID: getTargetID(),
    selectedResult,
    setVisibility,
    togglePlayNext,
    submit,
    cleanUpAndClose,
    setPriority,
  };
}

export default useAddToQueue;
