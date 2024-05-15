import { Button, Grid, TextField, Typography } from "@mui/material"

import toast from "react-hot-toast";
import { useState } from "react"

const FeedbackForm = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    if (title == "")
    {
      toast.error("Suggestion field cannot be empty")
    }
  }

  return (
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
  )
}

export default FeedbackForm
