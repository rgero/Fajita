import { Card, CardActionArea, CardContent, Typography, useTheme } from "@mui/material"

import { Playlist } from "../../interfaces/Playlist";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { offsetHexColor } from "../../utils/HexColorOffset";
import { usePlaylistProvider } from "../../context/PlaylistContext";

interface Props {
  playlist: Playlist,
  index: number,
}

const PlaylistCard: React.FC<Props> = ({index, playlist}) => {
  const theme = useTheme();
  const {setTargetPlaylist} = usePlaylistProvider();

  const styles = {
    cardStyle: {
      width: "99%",
      margin: "auto",
      backgroundColor: index % 2 == 0 ? theme.palette.background.paper : offsetHexColor(theme.palette.background.paper, 20),
      marginBottom: 1
    }
  }

  return (
    <Card sx={styles.cardStyle}>
      <CardActionArea sx={{display: 'flex'}} onClick={() => {setTargetPlaylist(playlist)}}>
        <CardContent>
          <YouTubeIcon/>
        </CardContent>
        <CardContent sx={{flexGrow: 1}}>
          <Typography variant="subtitle2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {playlist.title}
          </Typography>
        </CardContent>
        <CardContent>
          {playlist.itemCount}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PlaylistCard
