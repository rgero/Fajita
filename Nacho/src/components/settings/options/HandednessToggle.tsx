import { Grid, Switch, Typography } from "@mui/material";

import { useSettings } from "../../../context/SettingsContext";

const HandednessOption = () => {
  const {isRightHanded, toggleHandedness} = useSettings();
  return (
    <Grid container direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
      <Grid item>
        <Typography variant="body1">Use Right Handed</Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Switch
            checked={Boolean(isRightHanded)}
            onChange={toggleHandedness}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HandednessOption
