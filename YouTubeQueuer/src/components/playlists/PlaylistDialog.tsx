import { DialogContent, useTheme } from "@mui/material"

import DialogComponent from "../ui/Dialog"
import PlaylistPresentation from "./PlaylistPresentation"
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const PlaylistDialog = ({open, setPlaylistOpen} : {open: boolean, setPlaylistOpen: (open: boolean) => void}) => {
  const theme = useTheme();
  const [playlist] = useLocalStorageState("", "fajitaPlaylist");

  return (
    <DialogComponent title={playlist ? JSON.parse(playlist).title : "Playlist"} open={open} setDialogOpen={setPlaylistOpen}>
      <DialogContent sx={{background: theme.palette.background.paper, paddingBottom: "120px"}}>
        <PlaylistPresentation/>
      </DialogContent>
    </DialogComponent>
  )
}

export default PlaylistDialog
