import { Button, Container, Grid, TextField, Typography } from "@mui/material"

import toast from "react-hot-toast";
import { useCreateFeedback } from "./hooks/useCreateFeedback";
import { useState } from "react"

const FeedbackForm = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const {isAdding, addFeedback} = useCreateFeedback();

  const handleSubmit = async () => {
    if (title == "")
    {
      toast.error("Suggestion field cannot be empty")
      return;
    }
    addFeedback({title, description: details}, {onSuccess: () => {
      setDetails("");
      setTitle("");
    }});
  }

  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            id="outlined-controlled"
            label="Suggestion"
            fullWidth
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
            required
            disabled={isAdding}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-controlled"
            label="Additional Details"
            fullWidth
            multiline
            rows={5}
            value={details}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDetails(event.target.value);
            }}
            disabled={isAdding}
          />
        </Grid>
        <Grid container justifyContent={"space-evenly"} sx={{paddingTop: 4}}>
          <Grid item>
            <Button variant="contained" color="error"><Typography fontWeight={"bold"}>Clear</Typography></Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="success" onClick={handleSubmit}><Typography fontWeight={"bold"}>Submit</Typography></Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default FeedbackForm
