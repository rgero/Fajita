import { Grid, Typography } from "@mui/material"

import { Interaction } from "../../interfaces/Interaction";

interface Props {
  data: Interaction
}

const QueueCard: React.FC<Props> = ({data}) => {
  const {first_name} = data.user;
  const {title, video_id, thumbnail} = data.video
  return (
    <Grid container justifyContent="center" spacing={{md: 2}}>
      <Grid item xs={4} md="auto">
        <img className="image-contain max-h-24" src={thumbnail} alt={title}/>
      </Grid>
      <Grid item xs={8} md="auto">
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="subtitle2">Added by {first_name}</Typography>
      </Grid>
    </Grid>
  )
}

export default QueueCard
