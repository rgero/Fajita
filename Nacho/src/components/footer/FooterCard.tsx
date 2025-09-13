import { Card, CardContent, CardMedia, LinearProgress, Typography } from "@mui/material";

import { useSettings } from "../../context/SettingsContext";

type CardProps = {
  title: string,
  imageURL: string,
  percentComplete: number,
  currentIndex: number,
  total: number,
  user: string
}

const FooterCard: React.FC<CardProps> = ({title, imageURL, percentComplete, currentIndex, total, user}) => {
  const {isFooterCompact} = useSettings();
  return (
    <Card 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        width: "100%",
        height: "100%", 
        paddingLeft: "10px" 
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, height: 80, objectFit: "cover" }}
        image={imageURL}
        alt={title}
      />
      <CardContent sx={{ display: "flex", flexGrow: 1, flexDirection: "column", minWidth: 0 }}>
        {!isFooterCompact && (<Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>Currently Playing - {currentIndex} / {total}</Typography>)}
        <Typography variant="subtitle2" component="div" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {title}
        </Typography>
        <Typography variant="subtitle2">Added by {user}</Typography>
        <LinearProgress variant="determinate" value={Math.round(percentComplete * 100)} />
      </CardContent>
    </Card>
  );
};

export default FooterCard;
