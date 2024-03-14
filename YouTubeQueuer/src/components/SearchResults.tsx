import { Container } from "@mui/material"
import { ResponseList } from "../dummyData/data"
import VideoCard from "./VideoCard"
import { YoutubeResponse } from "../interfaces/YoutubeResponse"

const SearchResults = () => {
  // I dislike the magic number of mt-24, but I can't get the header to sit on top. >.>

  const testList: YoutubeResponse = ResponseList;
  
  return (
    <Container>
      {
        testList.map( (entry: YoutubeResponse, index: number) => (
          <VideoCard data={entry} key={index}/>
        ))
      }
    </Container>
  )
}

export default SearchResults
