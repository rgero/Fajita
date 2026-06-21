import { AppBar, Grid, Toolbar, styled } from "@mui/material";

import React from "react";
import SearchBar from "../ui/SearchBar";
import UserAvatar from "../ui/UserAvatar"
import { useQueueContext } from "@context/queue/QueueContext";
import { useSearchParams } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SearchHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {queueData} = useQueueContext();
  const [searchTerm, setTerm] = React.useState<string>(searchParams.get("search") ? searchParams.get("search") as string: "");

  const processSubmit = () => {
    searchParams.set("search", searchTerm as string);
    setSearchParams(searchParams);
  }

  const isQueueLocked = queueData ? queueData.locked : false;

  return (
    <AppBar sx={{zIndex: 10}}>
      <StyledToolbar>
        <Grid container size="grow" sx={{ justifyContent: "center", alignItems: "center" }}>
          <Grid container spacing={2} size={{ xs: 12, sm: 10, md: 4 }} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Grid size="grow">
              <SearchBar
                value={searchTerm}
                setValue={setTerm}
                additionalFnKeydown={processSubmit}
                isLocked={isQueueLocked}
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
