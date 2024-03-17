import { AppBar, Grid, IconButton, InputAdornment, TextField, Toolbar, Typography, styled, useTheme } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import UserAvatar from "../authentication/UserAvatar"
import { inputLabelClasses } from "@mui/material/InputLabel";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const QueueHeader = () => {
  return (
    <AppBar>
      <StyledToolbar>
        <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={10} md={4}>
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
