import { Grid, Switch, Typography } from "@mui/material"

import { useSettings } from "../../../context/SettingsContext"

const FooterCardOptions = () => {
  const {isFooterCompact, toggleFooterCompact} = useSettings();
  return (
    <Grid container direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
      <Grid item>
        <Typography variant="body1">Compact Card</Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
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
