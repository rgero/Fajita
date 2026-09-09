import { Box, Grid, Stack, Typography, useTheme } from "@mui/material"
import { DoNotDisturb, RestartAlt } from "@mui/icons-material"

import Button from "../ui/Buttons/Button";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { useModalContext } from "@context/modal/ModalContext";
import { useSocketProvider } from '@context/websocket/WebsocketContext';

const ConfirmRestartModal = () => {
  const {confirmRestartModalOpen, toggleConfirmRestartModalOpen} = useModalContext();
  const {resetProgress} = useSocketProvider();
  const theme = useTheme();
  
  const processRestart = () => {
    resetProgress();
    toast.success("Restarted Video!");
    toggleConfirmRestartModalOpen();
  }

  return (
    <Modal open={confirmRestartModalOpen} closeFn={toggleConfirmRestartModalOpen} sx={{backgroundColor: theme.palette.surface.secondary, color: theme.palette.surface.secondaryContrastText}}>
      <Stack spacing={2} sx={{ paddingY: "25px", alignItems: "center" }}>
        <Typography variant="h5" align="center">Are you sure you want to restart this song?</Typography>
        <Box
          component="img"
          src="/fajita.svg"
          alt="Rudy"
          sx={{
            width: "25%",
            height: "auto",
            borderRadius: 2,
          }}
        />
        <Grid container spacing={2} sx={{ justifyContent: "flex-end", width: "100%" }}>
          <Grid>
            <Button onClick={toggleConfirmRestartModalOpen}  icon={<DoNotDisturb />}  title="Cancel"/>
          </Grid>
          <Grid>
            <Button onClick={processRestart} icon={<RestartAlt color="success"/>} title="Do it"/>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  )
}

export default ConfirmRestartModal
