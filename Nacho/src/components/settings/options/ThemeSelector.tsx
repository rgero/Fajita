import { FormControl, Grid, MenuItem, Select, Typography, useTheme } from "@mui/material"
import { ThemeType, useTheme as useAppTheme } from '@context/theme/ThemeContext';

const ThemeSelector = () => {
  const { selectedTheme, setTheme } = useAppTheme();
  const muiTheme = useTheme();

  const handleChange = (event: any) => {
    setTheme(event.target.value as ThemeType);
  };

  return (
    <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "flex-end" }}>
      <Grid>
        <Typography variant="body1">Theme</Typography>
      </Grid>
      <Grid>
        <FormControl size="small" sx={{ width: 150 }}>
          <Select
            id="theme-select"
            value={selectedTheme}
            onChange={handleChange}
            inputProps={{ "aria-label": "Theme" }}
            sx={{
              backgroundColor: muiTheme.palette.background.paper,
              color: muiTheme.palette.text.primary,
            }}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="fleet">Fleet</MenuItem>
            <MenuItem value="halloween">Halloween</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default ThemeSelector
