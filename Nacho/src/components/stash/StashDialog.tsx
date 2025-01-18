import { Collapse, Container, IconButton, useTheme } from "@mui/material";

import Dialog from "../ui/Dialog";
import { Search } from "@mui/icons-material";
import SearchBar from "../ui/SearchBar";
import Spinner from "../ui/Spinner";
import StashList from "./StashList";
import { useStashProvider } from "../../context/StashContext";
import { useState } from "react";

const StashDialog = ({open, setOpen} : {open: boolean, setOpen: (open: boolean) => void}) => {
  const { isLoading, stashData, error } = useStashProvider();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const theme = useTheme();

  const adornmentButtons = (
    <IconButton onClick={() => setShowSearch(!showSearch)} sx={{backgroundColor: showSearch ? theme.palette.grey[700] : "transparent"}}>
      <Search />
    </IconButton>
  )

  if (isLoading) return (<Spinner/>)

  const filteredData = stashData.artifacts.filter((entry) => {
    return entry.video.title.toLowerCase().includes(searchTerm.toLowerCase());
  })

  return (
    <Dialog open={open} setOpen={setOpen} title={"Your Stash"} titleButtons={adornmentButtons}>
      <Collapse in={showSearch}>
        <Container disableGutters sx={{maxWidth: 600, paddingY: "10px"}}>
          <SearchBar value={searchTerm} setValue={setSearchTerm} />
        </Container>
      </Collapse>
      <StashList isLoading={isLoading} stashData={filteredData} error={error} />
    </Dialog>
  );
}

export default StashDialog
