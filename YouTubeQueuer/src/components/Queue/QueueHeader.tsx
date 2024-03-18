import { AppBar, Grid, IconButton, Toolbar, Typography, styled } from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserAvatar from "../authentication/UserAvatar"
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const QueueHeader = () => {
  const navigate = useNavigate();
  return (
    <AppBar>
      <StyledToolbar>
        <Grid container spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Grid item>
            <IconButton onClick={()=> navigate('/') }>
              <ArrowBackIcon/>
            </IconButton>
          </Grid>
          <Grid item xs={9} md={4}>
            <Typography variant="h4">The Queue</Typography>
          </Grid>
          <Grid item>
            <UserAvatar/>
          </Grid>
        </Grid>
      </StyledToolbar>
    </AppBar>
  )
}

export default QueueHeader
