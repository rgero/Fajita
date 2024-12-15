import { Grid, MenuItem } from "@mui/material"

import FeedbackIcon from '@mui/icons-material/Feedback';
import { useNavigate } from "react-router-dom";

const FeedbackOption = () => {
  const navigate = useNavigate();
  return (
    <MenuItem onClick={()=> navigate('/feedback')}>
      <Grid container direction="row" spacing={1}>
        <Grid item>
          <FeedbackIcon />
        </Grid>
        <Grid item>
          Log Feedback
        </Grid>
      </Grid>
    </MenuItem>
  )
}

export default FeedbackOption
