import { Button } from "@mui/material";
import PageHeader from "../ui/PageHeader";
import { Playlist } from "../../interfaces/Playlist";
import PlaylistCard from "./PlaylistCard";
import { YoutubeResponse } from "../../interfaces/YoutubeResponse";
import { useGetPlaylistData } from "./hooks/useGetPlaylistData";

const PlaylistDetails = ({playlist, clearFunction}: {playlist: Playlist, clearFunction: () => void}) => {
  const {playlistData} = useGetPlaylistData(playlist.id);
  if (!playlistData) return;
  return (
    <>
      <PageHeader title={playlist.title}/>
      <Button onClick={clearFunction} fullWidth>
        Switch Playlist
      </Button>
      {playlistData.map( (entry: YoutubeResponse, index: number) => (
        <PlaylistCard key={index} video={entry} index={index}/>
      ))}
    </>
  )
}
export default PlaylistDetails
