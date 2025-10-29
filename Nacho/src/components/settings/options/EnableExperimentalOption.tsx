import { Grid, Switch, Typography } from "@mui/material";

import { useSettings } from '@context/settings/SettingsContext';

const EnableExperimentalOption = () => {
  const {enableExperimental, toggleExperimental} = useSettings();
  return (
    <Grid container direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
      <Grid>
        <Typography variant="body1">Enable Experiments</Typography>
      </Grid>
      <Grid>
        <Grid container alignItems="center">
          <Switch
            checked={Boolean(enableExperimental)}
            onChange={toggleExperimental}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EnableExperimentalOption
