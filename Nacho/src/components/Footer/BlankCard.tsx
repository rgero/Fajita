import { Card, CardContent, CardMedia, Typography } from "@mui/material"

const BlankCard = () => {
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
        <Typography variant="subtitle2" component="div" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Nothing in Queue
        </Typography>
        <Typography variant="subtitle2">Have you considered adding songs?</Typography>
      </CardContent>
    </Card>
  );
}

export default BlankCard
