import { Box, CircularProgress } from "@mui/material"

import SearchHeader from "./SearchHeader"
import VideoCard from "./VideoCard"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import { useSearchResults } from "./hooks/useSearchResults"

const SearchResults = () => {
  const {isLoading, searchResults} = useSearchResults();
  if (isLoading) return (<CircularProgress />)
  
  
  return (
    <>
      <SearchHeader/>
      {
        searchResults.map( (entry: YoutubeResponse, index: number) => (
          <Box sx={{paddingBottom: {xs: 2}}}>
            <VideoCard data={entry} key={index}/>
          </Box>
        ))
      }
    </>
  )
}

export default SearchResults
