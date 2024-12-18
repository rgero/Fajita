import { Grid, MenuItem } from "@mui/material"

import { Settings } from "@mui/icons-material";

const UserSettingsOption = ({setOpen} : {setOpen : (open: boolean) => void}) => {
  return (
    <MenuItem onClick={()=> setOpen(true)}>
      <Grid container direction="row" spacing={1}>
        <Grid item>
          <Settings />
        </Grid>
        <Grid item>
          Settings
        </Grid>
      </Grid>
    </MenuItem>
  )
}

export default UserSettingsOption
