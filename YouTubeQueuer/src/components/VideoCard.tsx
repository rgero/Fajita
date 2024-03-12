import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { YoutubeResponse } from "../interfaces/YoutubeResponse"
import { decode } from "html-entities"

interface Props {
  data: YoutubeResponse
}

const VideoCard: React.FC<Props> = ({data}) => {

  const sendToQueue = () => {
    // Alerts are bad - mmkay
    alert(`${data.id} would be added, if backend`)
  }

  const title: string = decode(data.snippet.title);
  const thumbnail: string = data.snippet.thumbnails.max.url;
  const channelTitle: string = decode(data.snippet.channelTitle);
  return (
    <Card>
      <CardMedia
        sx={{height: 220}}
         image={thumbnail} 
         title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {channelTitle}
        </Typography>
      </CardContent>
      <CardActions>
        <Button>Add To Queue</Button>
      </CardActions>
    </Card>
  )
}

export default VideoCard
