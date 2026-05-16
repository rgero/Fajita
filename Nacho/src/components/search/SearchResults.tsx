import { Box } from "@mui/material"
import Empty from "../ui/Empty"
import SearchCard from "./SearchCard"
import Spinner from "../ui/Spinner"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import toast from "react-hot-toast"
import { useEffect } from "react"
import { useSearchContext } from "@context/search/SearchContext"

const SearchResults = () => {
  const {isLoading, searchResults, error} = useSearchContext();

  useEffect(() => {
    if (error) {
      toast.error("Error fetching search results");
    }
  }, [error]);

  if (isLoading) return (<Spinner/>)
  
  if (searchResults.length == 0)
  {
    return <Empty resource="videos"/>
  }

  return (
    <>
      {
        searchResults.map( (entry: YoutubeResponse) => (
          <Box sx={{paddingBottom: {xs: 2}}} key={entry.id}>
            <SearchCard data={entry}/>
          </Box>
        ))
      }
    </>
  )
}

export default SearchResults
