import { Grid, MenuItem } from "@mui/material"

import { Favorite } from "@mui/icons-material"

const StashDisplayOption = ({setOpen} : {setOpen : (open: boolean) => void}) => {
  return (
    <MenuItem onClick={() => setOpen(true)}>
      <Grid container direction="row" spacing={1}>
        <Grid item>
          <Favorite/> 
        </Grid>
        <Grid item>
          View Stash
        </Grid>
      </Grid>
    </MenuItem> 
  )
}

export default StashDisplayOption
