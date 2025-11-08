import { Box } from "@mui/material"
import Empty from "../ui/Empty"
import SearchCard from "./SearchCard"
import Spinner from "../ui/Spinner"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import toast from "react-hot-toast"
import { useSearchContext } from "@context/search/SearchContext"

const SearchResults = () => {
  const {isLoading, searchResults, error} = useSearchContext();

  if (isLoading) return (<Spinner/>)

  if (error) {
    toast.error("Error fetching search results");
  }
  
  if (searchResults.length == 0)
  {
    return <Empty resource="videos"/>
  }

  return (
    <>
      {
        searchResults.map( (entry: YoutubeResponse, index: number) => (
          <Box sx={{paddingBottom: {xs: 2}}} key={index}>
            <SearchCard data={entry}/>
          </Box>
        ))
      }
    </>
  )
}

export default SearchResults
