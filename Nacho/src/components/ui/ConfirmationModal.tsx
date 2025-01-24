import { Button, Grid, Typography } from "@mui/material"

import Modal from "./Modal"

const ConfirmationModal = ({confirmAction, isOpen, closeFn} : {confirmAction: ()=>void, isOpen: boolean, closeFn: ()=> void}) => {
  return (
    <Modal
      open={isOpen}
      closeFn={closeFn}
    >
        <Grid container spacing={5} direction="column" justifyContent="center" alignItems="center" sx={{paddingY: "5px"}}>
          <Grid item>
            <Typography variant="h6">Are you sure you want to clear your stash?</Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item>
                <Button variant="contained" color="success" onClick={confirmAction}>Yes</Button>
              </Grid>
              <Grid item>
                <Button  variant="contained" color="error" onClick={closeFn}>Cancel</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Modal>
  )
}

export default ConfirmationModal
