import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import SkipNextIcon from '@mui/icons-material/SkipNext';
import toast from "react-hot-toast";

const SkipOption = () => {

  const processClick = () => {
    toast.success("Skipped!");
  }

  return (
    <ListItem key="skip" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <SkipNextIcon/>
        </ListItemIcon>
        <ListItemText primary="Skip next video"/>
      </ListItemButton>
    </ListItem>
  )
}

export default SkipOption
