import { Grid, MenuItem } from "@mui/material"

import LightModeIcon from '@mui/icons-material/LightMode';
import { useDarkMode } from "../../../context/DarkModeContext";

const ToggleDarkModeOption = () => {
  const { toggleDarkMode } = useDarkMode();
  return (
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
  )
}

export default ToggleDarkModeOption
