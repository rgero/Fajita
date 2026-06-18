import { Grid, Stack, Switch, Typography } from "@mui/material"

import { useSettings } from '@context/settings/SettingsContext';

const InfoOptions  = () => {
  const {infoOptions, updateInfoOptions} = useSettings();

  const toggleInfoOption = (option: 'clipboard' | 'youtube' | 'stash') => {
    updateInfoOptions({
      ...infoOptions,
      [option]: !infoOptions[option]
    });
  }

  const renderOption = (label: string, option: 'clipboard' | 'youtube' | 'stash') => (
    <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "flex-end" }}>
      <Grid>
        <Typography variant="body1">{label}</Typography>
      </Grid>
      <Grid>
        <Grid container sx={{ alignItems: "center" }}>
          <Switch
            checked={Boolean(infoOptions[option])}
            onChange={() => toggleInfoOption(option)}
          />
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Stack>
      {renderOption("Copy to Clipboard", "clipboard")}
      {renderOption("Open in YouTube", "youtube")}
      {renderOption("Stash", "stash")}
    </Stack>
  )
}

export default InfoOptions
