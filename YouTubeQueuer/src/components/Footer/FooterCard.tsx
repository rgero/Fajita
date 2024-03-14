import { Grid, Typography } from "@mui/material";

import { decode } from "html-entities";
import { useCurrentPlaying } from "../../hooks/useCurrentPlaying";

const FooterCard = () => {
  const {isLoading, currentlyPlaying} = useCurrentPlaying();
  if (isLoading) return (<Typography>Loading...</Typography>)

  const isEmpty: boolean = Object.keys(currentlyPlaying).length == 0;

  if (isEmpty)
  {
    return (
      <Grid>
        <Typography variant="h4">Nothing is queued</Typography>
        <Typography variant="h6">Go add something!</Typography>
      </Grid>
    )
  }

  const title: string = decode(currentlyPlaying.snippet.title)
  const channelTitle: string = decode(currentlyPlaying.snippet.channelTitle)
  const imageURL: string = currentlyPlaying.snippet.thumbnails.default.url
 
  return (
    <Grid container>
      <Grid item xs={4}>
        <img className="image-contain max-h-24" src={imageURL} alt={title}/>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{!isEmpty ? "Currently Playing" : "Add to Queue!"}</Typography>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="subtitle2">{channelTitle}</Typography>
      </Grid>
    </Grid>
  )
}

export default FooterCard
