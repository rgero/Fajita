import { Card, CardContent, CardMedia, Typography } from "@mui/material"

import { YoutubeResponse } from "../../../interfaces/YoutubeResponse"
import { decode } from "html-entities"

interface Props {
  videoData: YoutubeResponse,
}

const ModalCard: React.FC<Props> = ({videoData}) => {

  const title: string = decode(videoData.snippet.title)
  const channelTitle: string = decode(videoData.snippet.channelTitle)
  const imageURL: string = videoData.snippet.thumbnails.medium.url

 
  return (
    <Card sx={{display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: 'center'}}>
      <CardMedia
        sx={{height: {xs: 220, md: 300}, width:"100%"}}
        image={imageURL} 
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
    </Card>
  )
}

export default ModalCard
