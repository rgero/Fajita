import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

import { ConstructYoutubeThumbnailURL } from "../../utils/ConstructYoutubeThumbnailURL"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import { decode } from "html-entities"

interface Props {
  data: YoutubeResponse,
  clickFn?: () => void | undefined
}

const styles = {
  card: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'white',
    backgroundColor: 'black',
    fontWeight: 'bold',
    paddingX: '10px',
    paddingY: "3px",
    borderRadius: 10
  }
}

const VideoCard: React.FC<Props> = ({data, clickFn}) => {

  const title: string = decode(data.title)
  const channelTitle: string = decode(data.author)
  const imageURL: string = data.thumbnail_src
  const views: string|undefined = data.views;
  const duration: string = data.duration;
  const constructedURL = ConstructYoutubeThumbnailURL(data.id);

  let cardContent = (
    <>
      <CardMedia
        component="img"
        sx={{
          height: {xs: 220, md: 300},
          objectFit: "cover",
        }}
        image={constructedURL}
        title={title}
        alt={title}
        onError={(e: any) => {
          (e.target as HTMLImageElement).src = imageURL;
        }}
      />
      <Typography sx={styles.overlay}>{duration}</Typography>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{wordBreak: "break-word"}}>
          {title}
        </Typography>
        {channelTitle && views && (
          <Typography variant="body2" color="text.secondary">
            {channelTitle} - {views}
          </Typography>
        )}
      </CardContent>
    </>
  )

  if (typeof clickFn === "function") {
    cardContent = (
      <CardActionArea onClick={clickFn}>
        {cardContent}
      </CardActionArea>
    )
  }

  return (
    <Card sx={styles.card}>
        {cardContent}
    </Card>
  )
}

export default VideoCard
