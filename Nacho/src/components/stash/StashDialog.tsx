import { Box, Container, Divider, Fade, IconButton, useTheme } from "@mui/material";
import { Casino, DeleteForever, Search } from "@mui/icons-material";

import AddRandomModal from "../modals/AddRandomModal";
import ClearStashModal from "../modals/ClearStashModal";
import Dialog from "../ui/Dialog";
import { Priority } from "../../interfaces/Priority";
import SearchBar from "../ui/SearchBar";
import StashList from "./StashList";
import toast from "react-hot-toast";
import { useQueueProvider } from "../../context/QueueContext";
import { useSettings } from "../../context/SettingsContext";
import { useStashProvider } from "../../context/StashContext";
import { useState } from "react";

const StashDialog = ({open, setOpen} : {open: boolean, setOpen: (open: boolean) => void}) => {
  const { searchTerm, setSearchTerm, deleteStash, stashData } = useStashProvider();
  const { addRandomVideo, isInQueue } = useQueueProvider();
  const {enableExperimental} = useSettings();
  const [deleteModal, setDeleteModal] = useState(false);
  const [randomModal, setRandomModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const theme = useTheme();

  const processShowHideSearch = (show: boolean) => {
    if (!show) { setSearchTerm(""); }
    setShowSearch(show);
  }

  const processSetOpen = (open: boolean) => {
    if (!open)
    {
      setSearchTerm("");
      setShowSearch(false);
    }
    setOpen(open);
  }

  const processConfirm = async () => {
    await deleteStash();
    setDeleteModal(false);
  }

  const addRandomFromStash = async (priority: Priority) => {
    try{
      let needsToPick = true;
      let randomVideo = "";
      let maxTries = 5;
      while (needsToPick)
      {
        const randomIndex = Math.floor(Math.random() * stashData.length);
        randomVideo = stashData[randomIndex].video.video_id;
        needsToPick = isInQueue(randomVideo);
        maxTries = maxTries - 1;
        if (maxTries === 0) { throw new Error("Unable to select unique video"); }
      }
      
      await addRandomVideo(randomVideo, priority);
      toast.success("Added random video to queue");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
      console.error(error);
    } finally {
      setRandomModal(false);
    }

  }

  const adornmentButtons = (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={() => setDeleteModal(true)} color={deleteModal ? "warning" : "default"}>
        <DeleteForever />
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem />
      {enableExperimental && (
        <>
          <IconButton onClick={() => setRandomModal(true)} color={randomModal ? "warning" : "default"}>
            <Casino/>
          </IconButton>
          <Divider orientation="vertical" variant="middle" flexItem />
        </>
      )}
      <IconButton onClick={() => processShowHideSearch(!showSearch)} color={showSearch ? "warning" : "default"}>
        <Search />
      </IconButton>
    </Box>
  );

  return (
    <Dialog open={open} setOpen={processSetOpen} title={"Stash"} titleButtons={adornmentButtons}>
      <ClearStashModal isOpen={deleteModal} closeFn={()=> setDeleteModal(false)} confirmAction={processConfirm} />
      {enableExperimental && (<AddRandomModal isOpen={randomModal} closeFn={() => setRandomModal(false)} confirmAction={addRandomFromStash} />)}
      <Fade in={showSearch} timeout={300}>
        <Container
          disableGutters
          sx={{
            maxWidth: 600,
            position: 'absolute',
            top: '75px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            backgroundColor: theme.palette.background.default,
            padding: '10px',
            borderRadius: '8px',
            boxShadow: theme.shadows[3],
          }}
        >
          <SearchBar 
            value={searchTerm} 
            setValue={setSearchTerm}
          />
        </Container>
      </Fade>

      <Container
        disableGutters
        sx={{
          marginTop: showSearch ? '90px' : '0px',
          transition: 'margin-top 0.3s ease',
        }}
      >
        <StashList />
      </Container>
    </Dialog>
  );
}

export default StashDialog
