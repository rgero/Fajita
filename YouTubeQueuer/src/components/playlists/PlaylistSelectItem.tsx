import { Box, Grid, Typography } from "@mui/material"

import { Playlist } from "../../interfaces/Playlist";
import React from "react";

interface Props {
  playlist: Playlist
  submitFn: (playlist: string) => void,
}

const PlaylistSelectItem: React.FC<Props> = ({playlist, submitFn}) => {

  const processSelection = (playlist: Playlist) => {
    submitFn(JSON.stringify(playlist));
  }
  
  return (
    <Box paddingY={1}>
      <Grid container onClick={() => {processSelection(playlist)}} justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{playlist.title}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">{playlist.itemCount}</Typography>
        </Grid>
      </Grid>
    </Box>

  )
}

export default PlaylistSelectItem
