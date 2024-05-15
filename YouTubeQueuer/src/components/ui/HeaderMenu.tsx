import {Grid, Menu, MenuItem} from "@mui/material";

import FeedbackIcon from '@mui/icons-material/Feedback';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";
import { deleteAllCookies } from "../../services/apiAuthentication";
import { useDarkMode } from "../../context/DarkModeContext";
import { useNavigate } from "react-router-dom";

interface Props
{
  anchorEl: HTMLElement | null,
  closeFn: () => void
}

const HeaderMenu: React.FC<Props> = ({anchorEl, closeFn}) => {
  const { toggleDarkMode } = useDarkMode();
  const isOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  
  const handleLogout = () =>
  {
    deleteAllCookies();
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout`;
  }
  
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={isOpen}
      onClose={closeFn}
      onClick={closeFn}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={toggleDarkMode}>
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <LightModeIcon/> 
          </Grid>
          <Grid item>
            Toggle Dark Mode
          </Grid>
        </Grid>
      </MenuItem>
      <MenuItem onClick={()=> navigate('/feedback')}>
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <FeedbackIcon />
          </Grid>
          <Grid item>
            Log Feedback
          </Grid>
        </Grid>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <LogoutIcon />
          </Grid>
          <Grid item>
            Log out
          </Grid>
        </Grid>
      </MenuItem>
    </Menu>
  );
}

export default HeaderMenu
