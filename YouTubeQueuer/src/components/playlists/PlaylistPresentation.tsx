import PlaylistDetails from "./PlaylistDetails";
import PlaylistSelector from "./PlaylistSelector";
import { usePlaylistProvider } from "../../context/PlaylistContext";

const PlaylistPresentation = () => {
  const {playlist} = usePlaylistProvider();
  
  if (playlist)
  {
    return <PlaylistDetails/>
  } else {
    return <PlaylistSelector/>
  }
}

export default PlaylistPresentation
