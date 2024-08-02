import { Box, ButtonBase, Grid, Typography, useTheme } from "@mui/material"

import { Playlist } from "../../interfaces/Playlist";
import React from "react";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { offsetHexColor } from "../../utils/HexColorOffset";

interface Props {
  playlist: Playlist,
  index: number,
  submitFn: (playlist: string) => void,
}

const PlaylistSelectItem: React.FC<Props> = ({playlist, index, submitFn}) => {
  const theme = useTheme();
  const offsetDir = theme.palette.mode === "dark" ? 1 : -1;

  const processSelection = (playlist: Playlist) => {
    submitFn(JSON.stringify(playlist));
  }
    
  return (
    <ButtonBase
      sx={{
        borderRadius: "5px",
        padding: "5px",
        width: "100%",
        background: index % 2 == 0 ? theme.palette.background.paper : offsetHexColor(theme.palette.background.paper, 20 * offsetDir)
      }}
      onClick={() => {processSelection(playlist)}}
    >
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <YouTubeIcon fontSize="large"/>
            </Grid>
            <Grid item>
              <Typography variant="h5">{playlist.title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5">{playlist.itemCount}</Typography>
        </Grid>
      </Grid>
    </ButtonBase>
  )
}

export default PlaylistSelectItem
