import { DoNotDisturb, ThumbUpAlt } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

import Button from "../ui/Button"
import Modal from "./Modal"
import { useModalContext } from "@context/modal/ModalContext"
import { useStashContext } from "@context/stash/StashContext"

const ClearStashModal = () => {
  const {clearStashModalOpen, toggleClearStashModalOpen} = useModalContext();
  const {deleteStash} = useStashContext();

  const processConfirm = async () => {
    await deleteStash();
    toggleClearStashModalOpen();
  }


  return (
    <Modal
      open={clearStashModalOpen}
      closeFn={toggleClearStashModalOpen}
    >
        <Grid container spacing={5} direction="column" justifyContent="center" alignItems="center" sx={{paddingY: "5px"}}>
          <Grid>
            <Typography variant="h6" align="center" sx={{textAlign: "center"}}>Are you sure you want to clear your stash?</Typography>
          </Grid>
          <Grid>
            <Grid container spacing={5} justifyContent="space-around">
              <Grid>
                <Button onClick={processConfirm} icon={<ThumbUpAlt/>} title="Delete" color="success"/>
              </Grid>
              <Grid>
                <Button onClick={toggleClearStashModalOpen} icon={<DoNotDisturb/>} title="Cancel" color="error"/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Modal>
  )
}

export default ClearStashModal
