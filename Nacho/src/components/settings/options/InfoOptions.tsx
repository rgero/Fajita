import { Grid, Switch, Typography } from "@mui/material"

import { useSettings } from '@context/settings/SettingsContext';

const InfoOptions  = () => {
  const {infoOptions, updateInfoOptions} = useSettings();

  const toggleInfoOption = (option: 'clipboard' | 'youtube' | 'stash') => {
    updateInfoOptions({
      ...infoOptions,
      [option]: !infoOptions[option]
    });
  }

  return (
    <Grid container direction="column">
      <Grid>
        <Grid container direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
          <Grid>
            <Typography variant="body1">Copy to Clipboard</Typography>
          </Grid>
          <Grid>
            <Grid container alignItems="center">
              <Switch
                checked={Boolean(infoOptions.clipboard)}
                onChange={() => toggleInfoOption("clipboard")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Grid container direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
          <Grid>
            <Typography variant="body1">Open in YouTube</Typography>
          </Grid>
          <Grid>
            <Grid container alignItems="center">
              <Switch
                checked={Boolean(infoOptions.youtube)}
                onChange={() => toggleInfoOption("youtube")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Grid container direction="row" alignItems="center" spacing={2} justifyContent="flex-end">
          <Grid>
            <Typography variant="body1">Stash</Typography>
          </Grid>
          <Grid>
            <Grid container alignItems="center">
              <Switch
                checked={Boolean(infoOptions.stash)}
                onChange={() => toggleInfoOption("stash")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default InfoOptions
