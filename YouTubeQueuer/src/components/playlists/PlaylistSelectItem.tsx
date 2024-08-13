import { ButtonBase, Grid, Typography, useTheme } from "@mui/material"

import { Playlist } from "../../interfaces/Playlist";
import React from "react";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { offsetHexColor } from "../../utils/HexColorOffset";
import { useDarkMode } from "../../context/DarkModeContext";
import { usePlaylistProvider } from "../../context/PlaylistContext";

interface Props {
  playlist: Playlist,
  index: number,
}

const PlaylistSelectItem: React.FC<Props> = ({playlist, index}) => {
  const {isDarkMode} = useDarkMode();
  const {setTargetPlaylist} = usePlaylistProvider();
  const theme = useTheme();
  const offsetDir = isDarkMode ? 1 : -1;

  const processSelection = (playlist: Playlist) => {
    setTargetPlaylist(playlist);
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
