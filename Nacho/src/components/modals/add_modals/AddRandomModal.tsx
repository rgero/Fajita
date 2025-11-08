import { AddCircle, SkipNext } from "@mui/icons-material"
import { Card, CardContent, CardHeader, CardMedia, Grid } from "@mui/material"

import Button from "../../ui/Button"
import Modal from "../Modal"
import { Priority } from "@interfaces/Priority"
import toast from "react-hot-toast"
import { useModalContext } from "@context/modal/ModalContext"
import { useQueueContext } from "@context/queue/QueueContext"
import { useStashContext } from "@context/stash/StashContext"

const AddRandomModal = () => {
  const {addRandomModalOpen, toggleAddRandomModalOpen} = useModalContext();
  const { addRandomVideo, isInQueue } = useQueueContext();
  const {stashData} = useStashContext();

  const isFajita = Math.random() > 0.75;

  const addRandomFromStash = async (priority: Priority) => {
    try{
      let needsToPick = true;
      let randomVideo = "";
      let maxTries = 5;
      while (needsToPick)
      {
        const randomIndex = Math.floor(Math.random() * stashData.length);
        randomVideo = stashData[randomIndex].video.video_id;
        needsToPick = isInQueue(randomVideo);
        maxTries = maxTries - 1;
        if (maxTries === 0) { throw new Error("Unable to select unique video"); }
      }
      
      await addRandomVideo(randomVideo, priority);
      toast.success("Added random video to queue");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
      console.error(error);
    } finally {
      toggleAddRandomModalOpen();
    }
  }


  return (
    <Modal
      open={addRandomModalOpen}
      closeFn={toggleAddRandomModalOpen}
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
            <Grid>
              <Button onClick={()=> addRandomFromStash(Priority.playNext)} icon={<SkipNext/>} title="Play Next"/>
            </Grid>
            <Grid>
              <Button onClick={()=> addRandomFromStash(Priority.normal)} icon={<AddCircle/>} title="Add"  color="success"/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default AddRandomModal
