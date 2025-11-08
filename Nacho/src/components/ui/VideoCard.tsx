import { Card, CardActionArea, CardContent, CardMedia, Typography, useTheme } from "@mui/material"

import { Artifact } from "@interfaces/Artifact"
import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import { decode } from "html-entities"
import { getParsedDuration } from "../../utils/getParsedDuration"
import { useSettings } from "../../context/settings/SettingsContext"

interface Props {
  data: Artifact|YoutubeResponse|null,
  clickFn?: () => void | undefined
}

const styles = {
  card: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '10px',
    fontWeight: 'bold',
    paddingX: '10px',
    paddingY: "3px",
    borderRadius: 10
  }
}

const isArtifact = (obj: any): obj is Artifact => {
  return obj && typeof obj === "object" && "video" in obj && "stash" in obj;
}

const VideoCard: React.FC<Props> = ({data, clickFn}) => {
  if (!data) return;
  
  const theme = useTheme();
  const title: string = decode(isArtifact(data) ? data.video.title : data.title)
  const channelTitle: string = decode(isArtifact(data) ? "" : data.author)
  const imageURL: string = isArtifact(data) ? data.video.thumbnail : data.thumbnail_src
  const views: string|undefined =  isArtifact(data) ? "" : data.views;
  const duration: string|number = isArtifact(data) ? data.video.duration : data.duration;

  const {isRightHanded} = useSettings();
  const overlayStyle = {
    ...styles.overlay,
    ...(!isRightHanded ? {right: "10px"} : {left: "10px"}),
    backgroundColor: theme.palette.background.paper
  }

  let cardContent = (
    <>
      <CardMedia
        component="img"
        sx={{
          height: {xs: 220, md: 300},
          objectFit: "cover",
        }}
        image={imageURL}
        title={title}
        alt={title}
      />
      <Typography sx={overlayStyle}>{getParsedDuration(duration)}</Typography>
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
