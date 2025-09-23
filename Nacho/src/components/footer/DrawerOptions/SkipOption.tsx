import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import SkipNextIcon from '@mui/icons-material/SkipNext';
import toast from "react-hot-toast";
import { useSocketProvider } from "../../../context/websocket/WebsocketContext";

const SkipOption = () => {
  const {skipVideo} = useSocketProvider();

  const processClick = () => {
    toast.success("Skipped!");
    skipVideo();
  }

  return (
    <ListItem key="skip" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <SkipNextIcon/>
        </ListItemIcon>
        <ListItemText primary="Skip video"/>
      </ListItemButton>
    </ListItem>
  )
}

export default SkipOption
