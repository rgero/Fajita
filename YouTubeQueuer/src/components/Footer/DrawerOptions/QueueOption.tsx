import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import QueueIcon from '@mui/icons-material/Queue';
import { useNavigate } from "react-router-dom";

const QueueOption = () => {
  const navigate = useNavigate();

  const processClick = () => {
    navigate("/queue");
  }

  return (
    <ListItem key="queue" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <QueueIcon/>
        </ListItemIcon>
        <ListItemText primary="View Queue" />
      </ListItemButton>
    </ListItem>
  )
}

export default QueueOption
