import { Container, Fade, IconButton, useTheme } from "@mui/material";

import Dialog from "../ui/Dialog";
import { Search } from "@mui/icons-material";
import SearchBar from "../ui/SearchBar";
import StashList from "./StashList";
import { useStashProvider } from "../../context/StashContext";
import { useState } from "react";

const StashDialog = ({open, setOpen} : {open: boolean, setOpen: (open: boolean) => void}) => {
  const { searchTerm, setSearchTerm } = useStashProvider();
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

  const adornmentButtons = (
    <IconButton onClick={() => processShowHideSearch(!showSearch)} sx={{backgroundColor: showSearch ? theme.palette.grey[700] : "transparent"}}>
      <Search />
    </IconButton>
  )

  return (
    <Dialog open={open} setOpen={processSetOpen} title={"Your Stash"} titleButtons={adornmentButtons}>
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
