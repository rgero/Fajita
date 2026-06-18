import { Grid, Switch, Typography } from "@mui/material"

import { useSettings } from '@context/settings/SettingsContext';

const FooterCardOptions = () => {
  const {isFooterCompact, toggleFooterCompact} = useSettings();
  return (
    <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "flex-end" }}>
      <Grid>
        <Typography variant="body1">Compact Card</Typography>
      </Grid>
      <Grid>
        <Grid container sx={{ alignItems: "center" }}>
          <Switch
            checked={Boolean(isFooterCompact)}
            onChange={toggleFooterCompact}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FooterCardOptions
