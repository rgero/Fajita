import { Container, Grid, IconButton, Typography } from "@mui/material";

import { deleteAllCookies } from "../services/apiAuthentication";
import { useEffect } from "react";
import { useTheme } from '@mui/material/styles';

const LogoutPage = () => {
  useEffect( ()=> {
    deleteAllCookies();
  },[])

  const theme = useTheme();
  return (
    <Container disableGutters sx={{minWidth: "100%", backgroundColor: `${theme.palette.background.paper}`, color: `${theme.palette.primary.light}`}}>
      <Grid container sx={{height: "100vh", paddingTop: "2rem"}} direction="column" alignItems="center">
        <Grid item>
          <IconButton
            href={`${import.meta.env.VITE_BACKEND_URL}/login`}
          >
            <img width={200} src="fajita.svg"/>
          </IconButton>
        </Grid>
        <Grid container direction="column" alignItems="center">
          <Typography variant="subtitle1">You've been logged out.</Typography>
          <Typography variant="subtitle1">Click the Fajita to log back in</Typography>
        </Grid>
      </Grid>

    </Container>
  )
}

export default LogoutPage
