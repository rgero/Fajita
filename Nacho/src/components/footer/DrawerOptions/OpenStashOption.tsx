import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import { Backpack } from "@mui/icons-material";
import { useDialogContext } from "../../../context/DialogContext";

const OpenStashOption = () => {

  const { toggleStashOpen } = useDialogContext();

  return (
    <ListItem key="stash" disablePadding onClick={toggleStashOpen}>
      <ListItemButton>
        <ListItemIcon>
          <Backpack/>
        </ListItemIcon>
        <ListItemText primary="Open Stash"/>
      </ListItemButton>
    </ListItem>
  )
}

export default OpenStashOption
