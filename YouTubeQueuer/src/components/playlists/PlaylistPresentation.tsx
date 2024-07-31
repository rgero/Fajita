import PlaylistDetails from "./PlaylistDetails";
import PlaylistSelector from "./PlaylistSelector";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const PlaylistPresentation = () => {
  const [playlist, setPlaylist] = useLocalStorageState("", "fajitaPlaylist");

  if (playlist)
  {
    return <PlaylistDetails playlist={JSON.parse(playlist)}/>
  } else {
    return <PlaylistSelector setPlaylistFn={setPlaylist}/>
  }
}

export default PlaylistPresentation
