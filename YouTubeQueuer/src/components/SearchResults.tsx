import { Container } from "@mui/material"
import { ResponseList } from "../dummyData/data"
import VideoCard from "./VideoCard"
import { YoutubeResponse } from "../interfaces/YoutubeResponse"

const SearchResults = () => {
  return (
    <Container className="flex flex-1 flex-col justify-center items-center">
      {
        ResponseList.map( (entry: YoutubeResponse, index: number) => (
          <VideoCard data={entry} key={index}/>
        ))
      }
    </Container>
  )
}

export default SearchResults
