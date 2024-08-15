import { Box, Typography } from "@mui/material";

import PlaylistCard from "./PlaylistCard";
import Spinner from "../ui/Spinner";
import { useGetPlaylists } from "./hooks/useGetPlaylists"

const PlaylistSelector = () => {
  const {isLoading, playlists} = useGetPlaylists();

  if (isLoading) return (<Spinner/>)
  
  if (!playlists || playlists.length == 0) {
    return (<Typography>No Playlists found?</Typography>)
  }
  
  return (
    <>
      <Box sx={{paddingTop: 2, paddingBottom: "70px"}}> 
      {playlists.map( (item, index) => {
          return (
            <PlaylistCard playlist={item} index={index}/>
          )
        })
      }
      </Box>
    </>
  )
}

export default PlaylistSelector
