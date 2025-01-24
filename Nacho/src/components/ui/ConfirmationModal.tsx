import { DoNotDisturb, ThumbUpAlt } from "@mui/icons-material"
import { Grid, Typography, useTheme } from "@mui/material"

import Button from "./Button"
import Modal from "./Modal"

const ConfirmationModal = ({confirmAction, isOpen, closeFn} : {confirmAction: ()=>void, isOpen: boolean, closeFn: ()=> void}) => {
  const theme = useTheme()
  return (
    <Modal
      open={isOpen}
      closeFn={closeFn}
    >
        <Grid container spacing={5} direction="column" justifyContent="center" alignItems="center" sx={{paddingY: "5px"}}>
          <Grid item>
            <Typography variant="h6" align="center" sx={{textAlign: "center"}}>Are you sure you want to clear your stash?</Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item>
                <Button onClick={confirmAction} icon={<ThumbUpAlt color="success"/>} title="Delete"/>
              </Grid>
              <Grid item>
                <Button onClick={closeFn} icon={<DoNotDisturb color="error"/>} title="Cancel"/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Modal>
  )
}

export default ConfirmationModal
