import { Button, Container, Grid, TextField, Typography } from "@mui/material";

import SpinnerModal from "../ui/SpinnerModal";
import { useSocket } from "../../hooks/useWebSocket";
import { useState } from "react";

const AnnouncementForm = () => {
  const socket = useSocket();

  const [canAnnounce, setCanAnnounce] = useState<boolean>(true);
  const [announcement, setAnnouncement] = useState<string>("");

  const handleSubmit = () => {
    socket.emit("announcement", announcement)
  }


  return (
    <Container>
      <SpinnerModal isOpen={!canAnnounce}/>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              id="outlined-controlled"
              label="What do you want to say?"
              fullWidth
              value={announcement}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setAnnouncement(event.target.value);
              }}
              required
              disabled={!canAnnounce}
            />
          </Grid>
          <Grid container justifyContent={"space-evenly"} sx={{paddingTop: 4}}>
            <Grid item>
              <Button variant="contained" color="error" disabled={!canAnnounce}><Typography fontWeight={"bold"}>Clear</Typography></Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="success" disabled={!canAnnounce} onClick={handleSubmit}><Typography fontWeight={"bold"}>Submit</Typography></Button>
            </Grid>
          </Grid>
        </Grid>
    </Container>
  )
}

export default AnnouncementForm
