import { AppBar, Grid, IconButton, InputAdornment, TextField, Toolbar, styled, useTheme } from "@mui/material";
import React, { KeyboardEvent } from "react";

import ClearIcon from '@mui/icons-material/Clear';
import UserAvatar from "../authentication/UserAvatar"
import { inputLabelClasses } from "@mui/material/InputLabel";
import { useSearchParams } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SearchHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setTerm] = React.useState<string>(searchParams.get("search") ? searchParams.get("search") as string: "");

  const theme = useTheme();

  const processSubmit = () => {
    searchParams.set("search", searchTerm as string);
    setSearchParams(searchParams);
  }

  const processClear = () => {
    setTerm( () => "" );
  }

  const endAdornment = searchTerm.length != 0 ? (
    <InputAdornment position="end">
      <IconButton
        aria-label="search field"
        onClick={processClear}
        size="small"
      >
        <ClearIcon/>
      </IconButton>
    </InputAdornment>
  ) : (null)

  return (
    <AppBar>
      <StyledToolbar>
        <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={10} md={4}>
            <TextField
              variant="filled"
              label="Search"
              fullWidth
              value={searchTerm}
              onChange={(e) => setTerm( ()=> e.target.value) }
              inputProps={{
                inputMode: "search",
                spellCheck: false
              }}
              InputProps={{
                endAdornment: endAdornment
              }}
              onKeyDown={(e: KeyboardEvent) => {
                if (e.key === "Enter")
                {
                  (e.target as HTMLElement).blur();
                  processSubmit();
                }
              }}
              InputLabelProps={{
                sx: {
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: `${theme.palette.primary.contrastText}`
                  }
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

export default SearchHeader
