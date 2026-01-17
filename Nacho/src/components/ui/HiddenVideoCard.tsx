import { Card, CardContent, CardMedia, Typography } from "@mui/material"

import { QueueStatus } from "@interfaces/QueueStatus"

interface Props {
  status: QueueStatus,
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

const HiddenVideoCard: React.FC<Props> = ({status}) => {
  if (!status) return;
  
  let cardContent = (
    <>
      <CardMedia
        component="img"
        sx={{
          height: {xs: 220, md: 300},
          objectFit: "cover",
        }}
        image={status.cover ? status.cover : ""}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {status.message}
        </Typography>
      </CardContent>
    </>
  )

  return (
    <Card sx={styles.card}>
        {cardContent}
    </Card>
  )
}

export default HiddenVideoCard
