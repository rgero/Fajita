import { Box } from "@mui/material";
import { Playlist } from "../../interfaces/Playlist";
import PlaylistCard from "./PlaylistCard";
import { YoutubeResponse } from "../../interfaces/YoutubeResponse";
import { useGetPlaylistData } from "./hooks/useGetPlaylistData";

const PlaylistDetails = ({playlist}: {playlist: Playlist}) => {
  const {playlistData} = useGetPlaylistData(playlist.id);
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
