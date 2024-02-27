import { ResponseList } from "./dummyData/data"
import { YoutubeResponse } from "./interfaces/YoutubeResponse"

const App = () => {
  return (
    <div>
      {
        ResponseList.map( (entry: YoutubeResponse, index: number) => (
          <div className="text-3xl font-bold">
            {index+1} - {entry.snippet.title}
          </div>
        ))
      }
    </div>
  )
}

export default App
