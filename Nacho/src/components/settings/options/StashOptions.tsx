import { Grid, Switch, Typography } from "@mui/material";

import { useSettings } from "../../../context/settings/SettingsContext";

const StashOptions = () => {
  const {isStashCompact, toggleCompactStash} = useSettings();
  return (
    <Grid container direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
      <Grid>
        <Typography variant="body1">Compact Stash Card</Typography>
      </Grid>
      <Grid>
        <Grid container alignItems="center">
          <Switch
            checked={Boolean(isStashCompact)}
            onChange={toggleCompactStash}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default StashOptions
