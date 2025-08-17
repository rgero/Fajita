import { Grid, Switch, Typography } from "@mui/material";

import { useSettings } from "../../../context/SettingsContext";

const EnableExperimentalOption = () => {
  const {enableExperimental, toggleExperimental} = useSettings();
  return (
    <Grid container direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
      <Grid item>
        <Typography variant="body1">Enable Experiments</Typography>
      </Grid>
      <Grid item>
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
