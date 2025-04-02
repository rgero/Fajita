import { DoNotDisturb, SkipNext, ThumbUpAlt } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

import Button from "../ui/Button"
import Modal from "./Modal"
import { Priority } from "../../interfaces/Priority"

const AddRandomModal = ({confirmAction, isOpen, closeFn} : {confirmAction: (priority: Priority)=>void, isOpen: boolean, closeFn: ()=> void}) => {
  return (
    <Modal
      open={isOpen}
      closeFn={closeFn}
    >
        <Grid container spacing={5} direction="column" justifyContent="center" alignItems="center" sx={{paddingY: "5px"}}>
          <Grid item>
            <Typography variant="h6" align="center" sx={{textAlign: "center"}}>Add a random song?</Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={5} justifyContent="space-around">
              <Grid item>
                <Button onClick={closeFn} icon={<DoNotDisturb color="error"/>} title="Cancel"/>
              </Grid>
              <Grid item>
                <Button onClick={()=> confirmAction(Priority.playNext)} icon={<SkipNext/>} title="Play Next"/>
              </Grid>
              <Grid item>
                <Button onClick={()=> confirmAction(Priority.normal)} icon={<ThumbUpAlt color="success"/>} title="Add Random"/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Modal>
  )
}

export default AddRandomModal
