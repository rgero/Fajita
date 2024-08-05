import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import QueueIcon from '@mui/icons-material/Queue';

const QueueOption = ({isQueueOpen, setQueueOpen} : {isQueueOpen: boolean, setQueueOpen: (open: boolean) => void}) => {

  const processClick = () => {
    setQueueOpen(!isQueueOpen);
  }

  return (
    <ListItem key="queue" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <QueueIcon/>
        </ListItemIcon>
        <ListItemText primary={isQueueOpen ? "Collapse Queue" : "View Queue"}/>
      </ListItemButton>
    </ListItem>
  )
}

export default QueueOption
