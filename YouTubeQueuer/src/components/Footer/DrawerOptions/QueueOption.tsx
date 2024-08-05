import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import QueueIcon from '@mui/icons-material/Queue';

const QueueOption = ({setQueueOpen} : {setQueueOpen: (open: boolean) => void}) => {

  const processClick = () => {
    setQueueOpen(true);
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
