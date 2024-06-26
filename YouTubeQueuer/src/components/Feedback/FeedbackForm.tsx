import { Button, Container, Grid, TextField, Typography } from "@mui/material"
import { UserResponse, useUser } from "../authentication/hooks/useUser";

import SpinnerModal from "../ui/SpinnerModal";
import toast from "react-hot-toast";
import { useCreateFeedback } from "./hooks/useCreateFeedback";
import { useState } from "react"

const FeedbackForm = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const {isAdding, addFeedback} = useCreateFeedback();
  const {user}: UserResponse = useUser();
  const maxLength:number = 10000;

  const handleSubmit = async () => {
    if (title == "")
    {
      toast.error("Suggestion field cannot be empty")
      return;
    }
    
    addFeedback({user: user?.name, title, description: details}, {onSuccess: () => {
      setDetails("");
      setTitle("");
    }});
  }
  
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <Container>
      <SpinnerModal isOpen={isAdding}/>
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
            inputProps={{
              maxLength: 10000,
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDetails(event.target.value);
            }}
            disabled={isAdding}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="caption">
                {formatNumber(details.length)} / {formatNumber(maxLength)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent={"space-evenly"} sx={{paddingTop: 4}}>
          <Grid item>
            <Button variant="contained" color="error" disabled={isAdding}><Typography fontWeight={"bold"}>Clear</Typography></Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="success" disabled={isAdding} onClick={handleSubmit}><Typography fontWeight={"bold"}>Submit</Typography></Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default FeedbackForm
