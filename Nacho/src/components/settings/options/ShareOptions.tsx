import { Grid, Stack, Switch, Typography } from "@mui/material"

import { useSettings } from '@context/settings/SettingsContext';

const ShareOptions  = () => {
  const {shareOptions, updateShareOptions} = useSettings();

  const toggleShareOption = (option: 'clipboard' | 'youtube' | 'stash') => {
    updateShareOptions({
      ...shareOptions,
      [option]: !shareOptions[option]
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
            checked={Boolean(shareOptions[option])}
            onChange={() => toggleShareOption(option)}
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

export default ShareOptions
