import { ResponseList } from "./dummyData/data"
import VideoCard from "./components/VideoCard"
import { YoutubeResponse } from "./interfaces/YoutubeResponse"

const App = () => {
  return (
    <div>
      {
        ResponseList.map( (entry: YoutubeResponse, index: number) => (
          <VideoCard data={entry} index={index}/>
        ))
      }
    </div>
  )
}

export default App
