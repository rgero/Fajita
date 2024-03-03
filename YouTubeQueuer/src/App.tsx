import Header from "./components/Header"
import { ResponseList } from "./dummyData/data"
import VideoCard from "./components/VideoCard"
import { YoutubeResponse } from "./interfaces/YoutubeResponse"

const App = () => {
  return (
    <div className="bg-slate-300">
      <Header/>
      <div className="grid justify-center items-center">
        {
          ResponseList.map( (entry: YoutubeResponse, index: number) => (
            <VideoCard data={entry} key={index} isEven={index % 2 == 0}/>
          ))
        }
      </div>
    </div>
  )
}

export default App
