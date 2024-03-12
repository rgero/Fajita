import { YoutubeResponse } from "../interfaces/YoutubeResponse"
import { decode } from "html-entities"

interface Props {
  data: YoutubeResponse
  isEven: boolean
}

const VideoCard: React.FC<Props> = ({data, isEven = false}) => {

  const sendToQueue = () => {
    // Alerts are bad - mmkay
    alert(`${data.id} would be added, if backend`)
  }

  const background = `max-w-screen-sm rounded overflow-hidden shadow-lg grid items-center justify-items-center ${isEven ? "" : "text-gray-300 bg-gray-500"}`
  const submitButton = `hover:bg-gray-400 font-bold py-2 px-4 rounded inline-flex items-center ${isEven ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-gray-300"}`
  const title: string = decode(data.snippet.title);
  const channelTitle: string = decode(data.snippet.channelTitle);
  const description: string = decode(data.snippet.description);
  return (
    <div className={background}>
      <img className="image-contain" src={data.snippet.thumbnails.max.url} alt={data.snippet.title}/>
      <div className="px-4 py-2">
        <p className="text-base font-bold">
          {title}
        </p>
        <p className="text-base font-bold">
          {channelTitle}
        </p>
        <p className="text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-4">
        <button className={submitButton} onClick={sendToQueue}>Add to Queue</button>
      </div>
    </div>
  )
}

export default VideoCard
