import { Box, Divider, Typography } from "@mui/material";

import ActiveQueueList from "./ActiveQueueList";
import Modal from "@components/modals/Modal";
import { useDialogContext } from "@context/dialog/DialogContext";

const ActiveQueueDialog = () => {
  const {activeQueuesOpen, toggleActiveQueuesOpen} = useDialogContext();
  return (
    <Modal
      open={activeQueuesOpen}
      closeFn={toggleActiveQueuesOpen}
      sx={{
        width: { xs: "80%", md: "30%" },
        height: { xs: "60%", md: "30%" },
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <>
        <Typography variant="h5" gutterBottom>Active Queues</Typography>
        <Divider/>
        <Box sx={{ overflowY: "auto", flex: 1, minHeight: 0 }}>
          <ActiveQueueList closeFn={toggleActiveQueuesOpen}/>
        </Box>
      </>
    </Modal>
  )
}

export default ActiveQueueDialog
