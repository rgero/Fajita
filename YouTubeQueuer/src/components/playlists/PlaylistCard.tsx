import { Card, CardActionArea, CardContent, CardMedia, Typography, useTheme } from "@mui/material"

import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import { offsetHexColor } from "../../utils/HexColorOffset";

const PlaylistCard = ({video, index} : {video: YoutubeResponse, index: number}) => {
  const theme = useTheme();

  const styles = {
    cardStyle: {
      width: "95%",
      margin: "auto",
      backgroundColor: index % 2 == 0 ? theme.palette.background.paper : offsetHexColor(theme.palette.background.paper, 20)
    }
  }
  
  return (
    <Card sx={styles.cardStyle}>
      <CardActionArea sx={{display: 'flex'}}>
        <CardMedia
          component="img"
          sx={{
            width: {xs: 120, md: 300},
            objectFit: "cover"
          }}
          image={video.thumbnail_src}
          alt={video.title}
        />
        <CardContent sx={{flexGrow: 1, maxWidth: {xs:"70%", md: "55%"}}}>
          <Typography noWrap variant="subtitle2">{video.title}</Typography>
          <Typography variant="subtitle2">{video.author}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PlaylistCard
