import { Grid, Typography } from "@mui/material";

import { decode } from "html-entities";
import { useCurrentPlaying } from "../../hooks/useCurrentPlaying";

const FooterCard = () => {
  const {isLoading, currentlyPlaying} = useCurrentPlaying();
  if (isLoading) return (<Typography>Loading...</Typography>)

  const isEmpty: boolean = currentlyPlaying == undefined;

  if (isEmpty)
  {
    return (
      <Grid>
        <Typography variant="h4">Nothing is playing</Typography>
        <Typography variant="h6">Go add something!</Typography>
      </Grid>
    )
  }

  const title: string = decode(currentlyPlaying?.snippet.title);
  const channelTitle: string = decode(currentlyPlaying?.snippet.channelTitle);
  const imageURL: string = currentlyPlaying ? currentlyPlaying.snippet.thumbnails.default.url : "";
 
  return (
    <Grid container justifyContent="center" spacing={{md: 2}}>
      <Grid item xs={4} md="auto">
        <img className="image-contain max-h-24" src={imageURL} alt={title}/>
      </Grid>
      <Grid item xs={8} md="auto">
        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{!isEmpty ? "Currently Playing" : "Add to Queue!"}</Typography>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="subtitle2">{channelTitle}</Typography>
      </Grid>
    </Grid>
  )
}

export default FooterCard
