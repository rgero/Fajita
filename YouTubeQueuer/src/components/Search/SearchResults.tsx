import { Container, Typography } from "@mui/material"

import VideoCard from "../VideoCard"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import { useSearchResults } from "./hooks/useSearchResults"

const SearchResults = () => {
  const {isLoading, searchResults} = useSearchResults();
  if (isLoading) return (<Typography>Loading...</Typography>)
  
  
  return (
    <Container className="mt-24 mb-32">
      {
        searchResults.map( (entry: YoutubeResponse, index: number) => (
          <VideoCard data={entry} key={index}/>
        ))
      }
    </Container>
  )
}

export default SearchResults
