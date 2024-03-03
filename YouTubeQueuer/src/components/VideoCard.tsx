import { YoutubeResponse } from "../interfaces/YoutubeResponse"
import { decode } from "html-entities"

interface Props {
  data: YoutubeResponse
  isEven: boolean
}

const VideoCard: React.FC<Props> = ({data, isEven = false}) => {
  const background = `max-w-screen-sm rounded overflow-hidden shadow-lg grid items-center justify-items-center ${isEven ? "bg-gray-400" : ""}`
  const submitButton = `hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ${isEven ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-gray-300"}`
  const title: string = decode(data.snippet.title);
  const channelTitle: string = decode(data.snippet.channelTitle);
  const description: string = decode(data.snippet.description);
  return (
    <div className={background}>
      <img className="image-contain" src={data.snippet.thumbnails.max.url} alt={data.snippet.title}/>
      <div className="px-4 py-2">
        <p className="text-gray-700 text-base font-bold">
          {title}
        </p>
        <p className="text-gray-700 text-base font-bold">
          {channelTitle}
        </p>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-4">
        <button className={submitButton}>Add to Queue</button>
      </div>
    </div>
  )
}

export default VideoCard
