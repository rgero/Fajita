import { Collapse, Container, Fade, IconButton, useTheme } from '@mui/material';

import Dialog from '../ui/Dialog';
import QueueList from './QueueList';
import { Search } from '@mui/icons-material';
import SearchBar from '../ui/SearchBar';
import { useQueueProvider } from '../../context/QueueContext';
import { useState } from 'react';

const QueueDialog = ({open, setQueueOpen} : {open: boolean, setQueueOpen: (open: boolean) => void}) => {
  const { searchTerm, setSearchTerm} = useQueueProvider();
  const [showSearch, setShowSearch] = useState(false);
  const theme = useTheme();

  const adornmentButtons = (
    <IconButton onClick={() => setShowSearch(!showSearch)} sx={{backgroundColor: showSearch ? theme.palette.grey[700] : "transparent"}}>
      <Search />
    </IconButton>
  )

  const processSetOpen = (open: boolean) => {
    if (!open)
    {
      setSearchTerm("");
      setShowSearch(false);
    }
    setQueueOpen(open);
  }

  return (
    <Dialog open={open} setOpen={processSetOpen} title={"Queue"} titleButtons={adornmentButtons}>
      <Fade in={showSearch} timeout={300}>
        <Container
          disableGutters
          sx={{
            maxWidth: 600,
            position: 'absolute', // Pinned to the top of the dialog
            top: '75px', // Position below the title
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10, // Ensures it's above other content
            backgroundColor: theme.palette.background.default,
            padding: '10px',
            borderRadius: '8px',
            boxShadow: theme.shadows[3],
          }}
        >
          <SearchBar value={searchTerm} setValue={setSearchTerm} />
        </Container>
      </Fade>

      {/* QueueList */}
      <Container
        disableGutters
        sx={{
          marginTop: showSearch ? '90px' : '0px', // Add space to avoid overlap
          transition: 'margin-top 0.3s ease', // Smooth transition
        }}
      >
        <QueueList />
      </Container>
    </Dialog>
  );
}

export default QueueDialog;