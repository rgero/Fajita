import { Grid, Typography } from "@mui/material"

import { YoutubeResponse } from "../../interfaces/YoutubeResponse"
import { decode } from "html-entities"

interface Props {
  videoData: YoutubeResponse,
}

const ModalCard: React.FC<Props> = ({videoData}) => {

  const title: string = decode(videoData.snippet.title)
  const channelTitle: string = decode(videoData.snippet.channelTitle)
  const imageURL: string = videoData.snippet.thumbnails.high.url
 
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Grid item>
        <img className="image-contain w-fit" src={imageURL} alt={title}/>
      </Grid>
      <Grid item sx={{paddingTop: "1rem"}}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="subtitle2">{channelTitle}</Typography>
      </Grid>
    </Grid>
  )
}

export default ModalCard
