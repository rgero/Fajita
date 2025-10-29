import { Grid, Switch, Typography } from "@mui/material";

import { useSettings } from '@context/settings/SettingsContext';

const HandednessOption = () => {
  const {isRightHanded, toggleHandedness} = useSettings();
  return (
    <Grid container direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
      <Grid>
        <Typography variant="body1">Use Right Handed</Typography>
      </Grid>
      <Grid>
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
