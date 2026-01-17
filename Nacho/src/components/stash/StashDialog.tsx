import { Box, Container, Divider, Fade, IconButton, MenuItem, Select, SelectChangeEvent, useTheme } from "@mui/material";
import { Casino, DeleteForever, FilterList } from "@mui/icons-material";

import Dialog from "../ui/Dialog";
import SearchBar from "../ui/SearchBar";
import StashList from "./StashList";
import { useDialogContext } from '@context/dialog/DialogContext';
import { useModalContext } from "@context/modal/ModalContext";
import { useStashContext } from '@context/stash/StashContext';
import { useState } from "react";

const StashDialog = () => {
  const {stashOpen, toggleStashOpen} = useDialogContext();
  const {addRandomModalOpen, clearStashModalOpen, toggleAddRandomModalOpen, toggleClearStashModalOpen} = useModalContext();
  const { searchTerm, sortOption, setSearchTerm, setSortOption } = useStashContext();
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
    toggleStashOpen()
  }

  const processSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value as string);
  }
  
  const adornmentButtons = (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={toggleClearStashModalOpen} color={clearStashModalOpen ? "warning" : "default"}>
        <DeleteForever />
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton onClick={toggleAddRandomModalOpen} color={addRandomModalOpen ? "warning" : "default"}>
        <Casino/>
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton onClick={() => processShowHideSearch(!showSearch)} color={showSearch ? "warning" : "default"}>
        <FilterList />
      </IconButton>
    </Box>
  );

  return (
    <Dialog open={stashOpen} setOpen={processSetOpen} title={"Stash"} titleButtons={adornmentButtons}>
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
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <SearchBar 
            value={searchTerm} 
            setValue={setSearchTerm}
          />
          <Select
            fullWidth
            value={sortOption}
            onChange={processSortChange}
          >
            <MenuItem value="date_newest">Date: Newest First</MenuItem>
            <MenuItem value="date_oldest">Date: Oldest First</MenuItem>
            <MenuItem value="title_asc">Title: A-Z</MenuItem>
            <MenuItem value="title_desc">Title: Z-A</MenuItem>
          </Select>
        </Container>
      </Fade>

      <Container
        disableGutters
        sx={{
          marginTop: showSearch ? '150px' : '0px',
          transition: 'margin-top 0.3s ease',
        }}
      >
        <StashList />
      </Container>
    </Dialog>
  );
}

export default StashDialog
