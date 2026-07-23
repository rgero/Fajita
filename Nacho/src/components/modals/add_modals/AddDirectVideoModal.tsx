import { Button, Stack, TextField } from "@mui/material";

import Modal from "../Modal";
import { Priority } from "@interfaces/Priority";
import { Visibility } from "@interfaces/Visibility";
import VisibilityGroup from "@components/ui/VisibilityGroup";
import toast from "react-hot-toast";
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
  const {addVideoToQueue} = useQueueContext();

  const [urlInput, setUrlInput] = useState("");
  const [visibility, setVisibility] = useState(Visibility.Normal);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setUrlInput("");
    setError(false);
    toggleAddDirectModalOpen();
  };

  const handleAddVideo = async () => {
    const videoId = extractYouTubeId(urlInput);

    if (!videoId) {
      setError(true);
      return;
    }

    setError(false);

    try {
      await addVideoToQueue({
        id: videoId,
        priority: Priority.normal,
        visibility: visibility,
      });
      toast.success("Video Added");
      
      // Close and reset
      handleClose();
    } catch (err) {
      toast.error("Failed to add video");
    }
  };

  return (
    <Modal open={addDirectModalOpen} closeFn={handleClose}>
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
            if (error) setError(false); // Clear error while user edits
          }}
          error={error}
          helperText={
            error ? "Please enter a valid YouTube video link." : ""
          }
        />
        <VisibilityGroup selected={visibility} setSelected={setVisibility}/>
        <Button variant="contained" onClick={handleAddVideo}>
          Add Video
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddDirectVideoModal;