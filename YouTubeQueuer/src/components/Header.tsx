import { AppBar, Grid, IconButton, InputAdornment, OutlinedInput, Toolbar, styled } from "@mui/material";

import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import UserAvatar from "../authentication/UserAvatar"

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Header = () => {
  const [searchTerm, setTerm] = React.useState("");

  const processSubmit = (e) => {
    e.target.blur();

    // This is where I'd send off to make the request.
    alert(searchTerm);
  }

  return (
    <AppBar>
      <StyledToolbar>
        <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={10} md={4}>
            <OutlinedInput
              id="outlined-search"
              type='text'
              fullWidth
              value={searchTerm}
              onChange={(e) => setTerm( ()=> e.target.value) }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="search field"
                    onClick={processSubmit}
                    edge="end"
                  >
                    <SearchIcon/>
                  </IconButton>
                </InputAdornment>
              }
              onKeyDown={(e) => {
                if (e.key === "Enter")
                {
                  processSubmit(e);
                }
              }}
            />
          </Grid>
          <Grid item>
            <UserAvatar/>
          </Grid>
        </Grid>


      </StyledToolbar>
    </AppBar>
  )
}

export default Header
