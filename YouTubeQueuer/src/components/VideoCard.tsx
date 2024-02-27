import { YoutubeResponse } from "../interfaces/YoutubeResponse"

interface Props {
  data: YoutubeResponse
  index: number
}

const VideoCard: React.FC<Props> = ({data, index}) => {
  return (
    <div className="max-w-screen-sm px-4 rounded overflow-hidden shadow-lg grid items-center justify-items-center" key={index}>
      <div className="font-bold text-xl mb-2">{data.snippet.title}</div>
      <img className="h-320 w-180" src={data.snippet.thumbnails.medium.url} alt={data.snippet.title}/>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">
          {data.snippet.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-8">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">Add to Queue</button>
      </div>
    </div>
  )
}

export default VideoCard
