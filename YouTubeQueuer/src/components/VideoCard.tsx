import { YoutubeResponse } from "../interfaces/YoutubeResponse"

interface Props {
  data: YoutubeResponse
}

const VideoCard: React.FC<Props> = ({data}) => {
  return (
    <div>
      {data.snippet.title}
    </div>

  )
}

export default VideoCard
