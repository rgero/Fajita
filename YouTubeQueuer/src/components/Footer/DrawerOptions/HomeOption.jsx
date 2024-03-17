import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

const HomeOption = () => {
  const navigate = useNavigate();

  const processClick = () => {
    navigate("/");
  }
  
  return (
    <ListItem key="home" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <SearchIcon/>
        </ListItemIcon>
        <ListItemText primary="Back to Search" />
      </ListItemButton>
    </ListItem>
  )
}

export default HomeOption
