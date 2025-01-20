import { AppBar, Grid, Toolbar, styled } from "@mui/material";

import React from "react";
import SearchBar from "../ui/SearchBar";
import UserAvatar from "../authentication/UserAvatar"
import { useSearchParams } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SearchHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setTerm] = React.useState<string>(searchParams.get("search") ? searchParams.get("search") as string: "");

  const processSubmit = () => {
    searchParams.set("search", searchTerm as string);
    setSearchParams(searchParams);
  }

  return (
    <AppBar sx={{zIndex: 10}}>
      <StyledToolbar>
        <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={9} sm={10} md={4}>
            <SearchBar
              value={searchTerm}
              setValue={setTerm}
              additionalFnKeydown={processSubmit}
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
