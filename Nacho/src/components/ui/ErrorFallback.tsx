import { Container, Grid, Typography, useTheme } from "@mui/material";

const ErrorFallback = () => {
  const theme = useTheme();
  return (
    <Container
      disableGutters
      sx={{
        minWidth: "100%",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Grid
        container
        sx={{ height: "100vh", paddingTop: "2rem" }}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" align="center">
          An error has occurred. Probably because you did something weird. Be proud and tell us how you got here.
        </Typography>
      </Grid>
    </Container>
  );
};

export default ErrorFallback;
