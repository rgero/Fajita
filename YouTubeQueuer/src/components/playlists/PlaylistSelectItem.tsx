import { Grid } from "@mui/material"
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
    <Grid container onClick={() => {processSelection(playlist)}}>
      <Grid item>
        {playlist.title}
      </Grid>
      <Grid item>
        {playlist.itemCount}
      </Grid>
    </Grid>
  )
}

export default PlaylistSelectItem
