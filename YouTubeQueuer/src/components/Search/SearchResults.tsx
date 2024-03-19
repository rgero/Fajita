import { Box } from "@mui/material"
import Spinner from "../ui/Spinner"
import VideoCard from "./VideoCard"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import { useSearchResults } from "./hooks/useSearchResults"

const SearchResults = () => {
  const {isLoading, searchResults} = useSearchResults();
  return (
    <>
      {isLoading ? <Spinner/> : ( 
        <>
          {
            searchResults.map( (entry: YoutubeResponse, index: number) => (
              <Box sx={{paddingBottom: {xs: 2}}} key={index}>
                <VideoCard data={entry}/>
              </Box>
            ))
          }
        </>
      )}
    </>
  )
}

export default SearchResults
