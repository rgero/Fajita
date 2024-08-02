import PlaylistDetails from "./PlaylistDetails";
import PlaylistSelector from "./PlaylistSelector";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const PlaylistPresentation = () => {
  const [playlist, setPlaylist] = useLocalStorageState("", "fajitaPlaylist");

  const clearFunction = () => {
    console.log("Hi");
    setPlaylist("");
  }

  if (playlist)
  {
    return <PlaylistDetails playlist={JSON.parse(playlist)} clearFunction={clearFunction}/>
  } else {
    return <PlaylistSelector setPlaylistFn={setPlaylist}/>
  }
}

export default PlaylistPresentation
