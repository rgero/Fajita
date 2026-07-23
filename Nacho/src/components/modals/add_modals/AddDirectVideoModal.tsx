import { Stack, TextField } from "@mui/material";

import AddToQueueOptions from "./AddToQueueOptions";
import Modal from "../Modal";
import PlayNextWarning from "../ui/PlayNextWarning";
import SubmittingSpinner from "../ui/SubmittingSpinner";
import { useCallback } from "react";
import useAddToQueue from "./hooks/useAddToQueue";
import { useModalContext } from "@context/modal/ModalContext";
import { useQueueContext } from "@context/queue/QueueContext";
import { useState } from "react";

const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.trim().match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

const AddDirectVideoModal = () => {
  const { addDirectModalOpen, toggleAddDirectModalOpen } = useModalContext();
  const { queueData, isConnected } = useQueueContext();

  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState(false);

  const videoId = extractYouTubeId(urlInput);
  const isQueueLocked = queueData?.locked ?? false;

  const handleClose = useCallback(() => {
    setUrlInput("");
    setUrlError(false);
    toggleAddDirectModalOpen();
  }, [toggleAddDirectModalOpen]);

  const { isSubmitting, playNextCondition, submit, cleanUpAndClose, priority, visibility, setVisibility, togglePlayNext } = useAddToQueue(videoId, handleClose);

  const handleSubmit = () => {
    if (!videoId) {
      setUrlError(true);
      return;
    }
    submit();
  };

  const displayObject = () => {
    if (isSubmitting) return <SubmittingSpinner />;
    if (playNextCondition !== undefined && playNextCondition !== null && playNextCondition !== 0) {
      return <PlayNextWarning handleSubmit={submit} />;
    }

    return (
      <AddToQueueOptions
        targetID={videoId}
        isQueueLocked={isQueueLocked}
        priority={priority}
        selectedVisibility={visibility}
        setVisibility={setVisibility}
        handleSubmit={handleSubmit}
        handleToggle={togglePlayNext}
        disabled={!videoId}
      />
    );
  };

  return (
    <Modal open={addDirectModalOpen} closeFn={cleanUpAndClose}>
      <Stack spacing={2}>
        <TextField
          id="direct-video-url"
          label="Direct Video URL"
          placeholder="Enter full Youtube link"
          fullWidth
          required
          value={urlInput}
          onChange={(e) => {
            setUrlInput(e.target.value);
            if (urlError) setUrlError(false);
          }}
          error={urlError}
          helperText={urlError ? "Please enter a valid YouTube video link." : ""}
        />
        {isConnected ? displayObject() : null}
      </Stack>
    </Modal>
  );
};

export default AddDirectVideoModal;