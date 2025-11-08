import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useModalContext } from "@context/modal/ModalContext";

const SkipOption = () => {
  const {toggleConfirmSkipModalOpen} = useModalContext();

  const processClick = () => {
    toggleConfirmSkipModalOpen();
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
