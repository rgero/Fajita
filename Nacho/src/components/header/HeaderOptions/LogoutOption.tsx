import { Grid, MenuItem } from "@mui/material"

import LogoutIcon from '@mui/icons-material/Logout';
import { deleteAllCookies } from "../../../services/apiAuthentication";

const LogoutOption = () => {
  const handleLogout = () =>
    {
      deleteAllCookies();
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout`;
    }

  return (
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
  )
}

export default LogoutOption
