import { YoutubeResponse } from "../interfaces/YoutubeResponse"
import { decode } from "html-entities"

interface Props {
  data: YoutubeResponse
  isEven: boolean
}

const VideoCard: React.FC<Props> = ({data, isEven = false}) => {
  const background = `max-w-screen-sm px-4 pt-4 rounded overflow-hidden shadow-lg grid items-center justify-items-center ${isEven ? "bg-gray-400" : ""}`
  const title: string = decode(data.snippet.title);
  const channelTitle: string = decode(data.snippet.channelTitle);
  const description: string = decode(data.snippet.description);
  return (
    <div className={background}>
      <img className="object-cover" src={data.snippet.thumbnails.medium.url} alt={data.snippet.title}/>
      <div className="px-6 py-4">
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
      <div className="px-6 pt-4 pb-8">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">Add to Queue</button>
      </div>
    </div>
  )
}

export default VideoCard
