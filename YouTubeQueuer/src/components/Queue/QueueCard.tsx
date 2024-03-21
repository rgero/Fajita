import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

import { Interaction } from "../../interfaces/Interaction";

interface Props {
  data: Interaction
}

const QueueCard: React.FC<Props> = ({data}) => {
  const {first_name} = data.user;
  const {title, video_id, thumbnail} = data.video
  
  return (
    <Card>
      <CardActionArea sx={{display: 'flex'}} onClick={()=>console.log(data)}>
        <CardMedia
          component="img"
          sx={{width: {xs: 120, md: 300}}}
          image={thumbnail}
          alt={title}
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="subtitle2">Added by {first_name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default QueueCard
