import { Grid, Switch, Typography } from "@mui/material"

import { useSettings } from "../../../context/SettingsContext"

const ShareOptions  = () => {
  const {shareOptions, updateShareOptions} = useSettings();

  const toggleShareOption = (option: 'clipboard' | 'youtube' | 'stash') => {
    updateShareOptions({
      ...shareOptions,
      [option]: !shareOptions[option]
    });
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
          <Grid item>
            <Typography variant="body1">Copy to Clipboard</Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Switch
                checked={Boolean(shareOptions.clipboard)}
                onChange={() => toggleShareOption("clipboard")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
          <Grid item>
            <Typography variant="body1">Open in YouTube</Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Switch
                checked={Boolean(shareOptions.youtube)}
                onChange={() => toggleShareOption("youtube")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
          <Grid item>
            <Typography variant="body1">Stash</Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Switch
                checked={Boolean(shareOptions.stash)}
                onChange={() => toggleShareOption("stash")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ShareOptions
