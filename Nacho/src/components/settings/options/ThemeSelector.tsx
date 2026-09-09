import { FormControl, Grid, InputLabel, MenuItem, Select, useTheme } from "@mui/material"
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
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="theme-select-label">Theme</InputLabel>
          <Select
            labelId="theme-select-label"
            id="theme-select"
            value={selectedTheme}
            onChange={handleChange}
            label="Theme"
            sx={{
              backgroundColor: muiTheme.palette.background.paper,
              color: muiTheme.palette.text.primary,
            }}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="fleet">Fleet</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default ThemeSelector
