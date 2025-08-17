import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import QueueIcon from '@mui/icons-material/Queue';
import { useDialogContext } from "../../../context/DialogContext";

const QueueOption = () => {

  const { queueOpen, toggleQueueOpen } = useDialogContext();

  return (
    <ListItem key="queue" disablePadding onClick={toggleQueueOpen}>
      <ListItemButton>
        <ListItemIcon>
          <QueueIcon/>
        </ListItemIcon>
        <ListItemText primary={queueOpen ? "Collapse Queue" : "View Queue"}/>
      </ListItemButton>
    </ListItem>
  )
}

export default QueueOption
