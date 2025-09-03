import { AddCircle, SkipNext } from "@mui/icons-material"
import { Card, CardContent, CardHeader, CardMedia, Grid } from "@mui/material"

import Button from "../ui/Button"
import Modal from "./Modal"
import { Priority } from "../../interfaces/Priority"

const AddRandomModal = ({confirmAction, isOpen, closeFn} : {confirmAction: (priority: Priority)=>void, isOpen: boolean, closeFn: ()=> void}) => {

  const isFajita = Math.random() > 0.75;

  return (
    <Modal
      open={isOpen}
      closeFn={closeFn}
    >
      <Card 
        sx={{ 
          alignItems: "center", 
          width: "100%", 
        }}
      >
        <CardHeader
          title={isFajita ? "Let Rudy Pick?" : "Let Daisy Pick?"}
          titleTypographyProps={{ align: "center", variant: "h5" }}
        />
        <CardMedia
          component="img"
          sx={{
            height: {xs: 220, md: 300},
            objectFit: "scale-down",
          }}
          image={ isFajita ? "./fajita.png" : "./Daisy.png"}
          alt="Random Song"
        />
        <CardContent sx={{ display: "flex", flexGrow: 1, flexDirection: "column", minWidth: 0 }}>
          <Grid container spacing={5} justifyContent="space-around">
            <Grid item>
              <Button onClick={()=> confirmAction(Priority.playNext)} icon={<SkipNext/>} title="Play Next"/>
            </Grid>
            <Grid item>
              <Button onClick={()=> confirmAction(Priority.normal)} icon={<AddCircle/>} title="Add"  color="success"/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default AddRandomModal
