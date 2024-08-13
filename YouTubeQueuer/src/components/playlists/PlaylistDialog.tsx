import { DialogContent, Grid, IconButton, useTheme } from "@mui/material"

import AutorenewIcon from '@mui/icons-material/Autorenew';
import DialogComponent from "../ui/Dialog"
import PlaylistPresentation from "./PlaylistPresentation"
import { usePlaylistProvider } from "../../context/PlaylistContext";

const PlaylistDialog = ({open, setPlaylistOpen} : {open: boolean, setPlaylistOpen: (open: boolean) => void}) => {
  const theme = useTheme();
  const {playlist, clearPlaylist} = usePlaylistProvider();


  const switchPlaylistHeader = () : JSX.Element => {
    return (
      <Grid item>
        <IconButton
          edge="end"
          color="inherit"
          onClick={clearPlaylist}
          aria-label="switch playlist"
        >
          <AutorenewIcon />
        </IconButton>
      </Grid>
    )
  }

  return (
    <DialogComponent title={playlist ? JSON.parse(playlist).title : "Playlist"} open={open} setDialogOpen={setPlaylistOpen} addHeaders={switchPlaylistHeader}>
      <DialogContent sx={{background: theme.palette.background.paper, paddingBottom: "120px"}}>
        <PlaylistPresentation/>
      </DialogContent>
    </DialogComponent>
  )
}

export default PlaylistDialog
