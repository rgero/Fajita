import {Divider, Grid, Menu, MenuItem, Typography} from "@mui/material";

import ActiveQueueDialog from "../active_queues/ActiveQueueDialog";
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";
import { deleteAllCookies } from "../../services/apiAuthentication";
import { useDarkMode } from "../../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { useQueueProvider } from "../../context/QueueContext";

interface Props
{
  anchorEl: HTMLElement | null,
  closeFn: () => void
}

const HeaderMenu: React.FC<Props> = ({anchorEl, closeFn}) => {
  const { toggleDarkMode } = useDarkMode();
  const isOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const {getQueueOwner} = useQueueProvider();
  const [activeQueuesOpen, setActiveQueuesOpen] = React.useState(false);
  
  const handleLogout = () =>
  {
    deleteAllCookies();
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout?next=nacho`;
  }

  const queueOwner: string = getQueueOwner();
  
  return (
    <>
      <ActiveQueueDialog open={activeQueuesOpen} setOpen={setActiveQueuesOpen}/>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={closeFn}
        onClick={closeFn}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {queueOwner && (
          <MenuItem>
            <Grid container direction="row" spacing={1} justifyContent="center">
              <Grid item>
                <Typography>
                  {queueOwner}'s Queue
                </Typography>
              </Grid>
            </Grid>
          </MenuItem>
        )}
        <MenuItem onClick={() => setActiveQueuesOpen(true)}>
          <Grid container direction="row" spacing={1}>
            <Grid item>
              <CameraswitchIcon/> 
            </Grid>
            <Grid item>
              Connect to Queue
            </Grid>
          </Grid>
        </MenuItem>
        <Divider/>
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
        <Divider/>
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
    </>
  );
}

export default HeaderMenu
