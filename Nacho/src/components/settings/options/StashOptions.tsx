import { Grid, Switch, Typography } from "@mui/material";

import { useSettings } from '@context/settings/SettingsContext';

const StashOptions = () => {
  const {isStashCompact, toggleCompactStash} = useSettings();
  return (
    <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "flex-end" }}>
      <Grid>
        <Typography variant="body1">Compact Stash Card</Typography>
      </Grid>
      <Grid>
        <Grid container sx={{ alignItems: "center" }}>
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
