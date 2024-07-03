import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';

const SearchOption = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const processClick = () => {
    // We want to go back to the Search Page
    // Ideally retaining what the person had searched before.
    if (location.key === "default")
    {
      navigate('/')
    } else {
      navigate(-1);
    }
  }
  
  return (
    <ListItem key="backToSearch" disablePadding onClick={processClick}>
      <ListItemButton>
        <ListItemIcon>
          <SearchIcon/>
        </ListItemIcon>
        <ListItemText primary="Back to Search" />
      </ListItemButton>
    </ListItem>
  )
}

export default SearchOption
