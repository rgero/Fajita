import { Card, CardContent, CardMedia, Typography } from "@mui/material"

import { useQueueContext } from '@context/queue/QueueContext';

const BlankCard = () => {
  const {queueData} = useQueueContext();
  return (
    <Card 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        width: "100%", 
        paddingLeft: "10px" 
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, objectFit: "contain" }}
        image={"./Daisy.png"}
        alt={"Nothing is Playing"}
      />
      <CardContent sx={{ display: "flex", flexGrow: 1, flexDirection: "column", minWidth: 0 }}>
        <Typography variant="subtitle2" component="div" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: "bold"}}>
          {queueData.id ? "Nothing in Queue" : "Not connected to queue"}
        </Typography>
        <Typography variant="subtitle2">{queueData.id ? "Have you considered adding songs?" : "Try connecting to one"}</Typography>
      </CardContent>
    </Card>
  );
}

export default BlankCard
