import { Box } from "@mui/material";
import PlaylistCard from "./PlaylistCard";
import { YoutubeResponse } from "../../interfaces/YoutubeResponse";
import { useGetPlaylistData } from "./hooks/useGetPlaylistData";
import { usePlaylistProvider } from "../../context/PlaylistContext";

const PlaylistDetails = () => {
  const {playlist} = usePlaylistProvider();
  const targetPlaylist = JSON.parse(playlist);
  const {playlistData} = useGetPlaylistData(targetPlaylist.id);
  
  if (!playlistData) return;
  
  return (
    <>
      <Box> 
        {
          playlistData.map( (entry: YoutubeResponse, index: number) => (
            <Box 
              sx={{paddingBottom: {xs: 1}}} 
              key={index} 
              id={`${index}`}
            >
              <PlaylistCard key={index} video={entry} index={index}/>
            </Box>
          ))
        }
      </Box>
    </>
  )
}
export default PlaylistDetails
