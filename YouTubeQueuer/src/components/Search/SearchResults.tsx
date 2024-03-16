import { CircularProgress } from "@mui/material"
import VideoCard from "../VideoCard"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import { useSearchResults } from "./hooks/useSearchResults"

const SearchResults = () => {
  const {isLoading, searchResults} = useSearchResults();
  if (isLoading) return (<CircularProgress />)
  
  
  return (
    <>
      {
        searchResults.map( (entry: YoutubeResponse, index: number) => (
          <VideoCard data={entry} key={index}/>
        ))
      }
    </>
  )
}

export default SearchResults
