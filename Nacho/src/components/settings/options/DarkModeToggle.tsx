import { Brightness4, Brightness7 } from "@mui/icons-material"
import { Grid, Switch, Typography, useTheme } from "@mui/material"

import { useDarkMode } from '@context/darkmode/DarkModeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const theme = useTheme();
  return (
    <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "flex-end" }}>
      <Grid>
        <Typography variant="body1">Dark Mode</Typography>
      </Grid>
      <Grid>
        <Grid container sx={{ alignItems: "center" }}>
          <Switch
            checked={Boolean(isDarkMode)}
            onChange={toggleDarkMode}
            icon={<Brightness7 style={{ color: theme.palette.primary.main, transform: 'translateY(-10%)' }} />}
            checkedIcon={<Brightness4 style={{ color: theme.palette.primary.main, transform: 'translateY(-10%)' }} />}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DarkModeToggle
