import PageHeader from "../ui/PageHeader";
import { Playlist } from "../../interfaces/Playlist";

const PlaylistDetails = ({playlist}: {playlist: Playlist}) => {
  console.log("FUCKING HI");
  return (
    <>
      <PageHeader title={playlist.title}/>
    </>
  )
}

export default PlaylistDetails
