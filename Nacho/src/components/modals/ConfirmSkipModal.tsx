import { DoNotDisturb, SkipNext } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

import Button from "../ui/Button";
import Modal from "./Modal";
import { grey } from "@mui/material/colors";
import toast from "react-hot-toast";
import { useModalContext } from "@context/modal/ModalContext";
import { useSocketProvider } from '@context/websocket/WebsocketContext';

const ConfirmSkipModal = () => {
  const {confirmSkipModalOpen, toggleConfirmSkipModalOpen} = useModalContext();
  const {skipVideo} = useSocketProvider();
  
  const processSkip = () => {
    skipVideo();
    toast.success("Skipped!");
    toggleConfirmSkipModalOpen();
  }

  return (
    <Modal open={confirmSkipModalOpen} closeFn={toggleConfirmSkipModalOpen} yPosOverride="75%" sx={{backgroundColor: grey[900]}}>
      <Grid container direction="column" alignContent={"center"} spacing={2} sx={{paddingY: "25px"}}>
        <Grid>
          <Typography variant="h5">Are you sure you want to skip this song?</Typography>
        </Grid>
        <Grid>
          <Grid container justifyContent={"flex-end"} spacing={2}>
            <Grid>
              <Button onClick={toggleConfirmSkipModalOpen}  icon={<DoNotDisturb />}  title="Cancel"/>
            </Grid>
            <Grid>
              <Button onClick={processSkip} icon={<SkipNext color="success"/>} title="Do it"/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ConfirmSkipModal
