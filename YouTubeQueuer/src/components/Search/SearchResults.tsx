import { SearchResponse, useSearchResults } from "./hooks/useSearchResults"

import { Box } from "@mui/material"
import Empty from "../ui/Empty"
import Spinner from "../ui/Spinner"
import VideoCard from "./VideoCard"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"

const SearchResults = () => {
  const {isLoading, searchResults}: SearchResponse = useSearchResults();

  if (isLoading) return (<Spinner/>)

  if (searchResults.length == 0)
  {
    return <Empty resource="videos"/>
  }

  return (
    <>
      {
        searchResults.map( (entry: YoutubeResponse, index: number) => (
          <Box sx={{paddingBottom: {xs: 2}}} key={index}>
            <VideoCard data={entry}/>
          </Box>
        ))
      }
    </>
  )
}

export default SearchResults
