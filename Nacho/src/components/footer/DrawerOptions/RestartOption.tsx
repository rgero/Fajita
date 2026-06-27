import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import { RestartAlt } from "@mui/icons-material";
import { useModalContext } from "@context/modal/ModalContext";

const RestartOption = () => {
  const {toggleConfirmRestartModalOpen} = useModalContext();

  const processClick = () => {
    toggleConfirmRestartModalOpen();
  }

  return (
    <ListItem key="restart" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <RestartAlt/>
        </ListItemIcon>
        <ListItemText primary="Restart video"/>
      </ListItemButton>
    </ListItem>
  )
}

export default RestartOption
