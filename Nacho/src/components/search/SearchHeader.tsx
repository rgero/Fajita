import { AppBar, Grid, Toolbar, styled } from "@mui/material";

import React from "react";
import SearchBar from "../ui/SearchBar";
import UserAvatar from "../ui/UserAvatar"
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
        <Grid container justifyContent="center" alignItems="center" size="grow">
          <Grid container spacing={2} alignItems="center" justifyContent="center" size={{ xs: 12, sm: 10, md: 4 }}>
            <Grid size="grow">
              <SearchBar
                value={searchTerm}
                setValue={setTerm}
                additionalFnKeydown={processSubmit}
              />
            </Grid>
            <Grid>
              <UserAvatar />
            </Grid>
          </Grid>
        </Grid>
      </StyledToolbar>
    </AppBar>
  )
}

export default SearchHeader
