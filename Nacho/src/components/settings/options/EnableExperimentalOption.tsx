import { Grid, Switch, Typography } from "@mui/material";

import { useSettings } from '@context/settings/SettingsContext';

const EnableExperimentalOption = () => {
  const {enableExperimental, toggleExperimental} = useSettings();
  return (
    <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "flex-end" }}>
      <Grid>
        <Typography variant="body1">Enable Experiments</Typography>
      </Grid>
      <Grid>
        <Grid container sx={{ alignItems: "center" }}>
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
