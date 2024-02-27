import Header from "./components/Header"
import { ResponseList } from "./dummyData/data"
import VideoCard from "./components/VideoCard"
import { YoutubeResponse } from "./interfaces/YoutubeResponse"

const App = () => {
  return (
    <>
      <Header/>
      <div className="grid justify-center items-center">
        {
          ResponseList.map( (entry: YoutubeResponse, index: number) => (
            <VideoCard data={entry} index={index}/>
          ))
        }
      </div>
    </>
  )
}

export default App
