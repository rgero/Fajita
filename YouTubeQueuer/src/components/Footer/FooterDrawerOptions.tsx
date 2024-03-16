import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import { DrawerOption } from '../../interfaces/DrawerOption';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import QueueIcon from '@mui/icons-material/Queue';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export const options: DrawerOption[] = [
  { key: "play", label: "Play", icon: <PlayArrowIcon/>, func: () => {console.log("Play")}},
  { key: "pause", label: "Pause", icon: <PauseCircleOutlineIcon/>, func: () => {console.log("Pause")}},
  { key: "skip", label: "Skip", icon: <SkipNextIcon/>, func: () => {console.log("Skip")}},
  { key: "closedcaptions", label: "Turn on Closed Captions", icon: <ClosedCaptionIcon/>,func: () => {console.log("CC")}},
  { key: "queue", label: "View Queue", icon: <QueueIcon/>, func: () => {console.log("View Queue")} },
]