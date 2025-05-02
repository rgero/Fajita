import { Button, Container, Grid, Typography, useTheme } from "@mui/material";

import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

const ErrorFallback: React.FC<FallbackProps> = ({resetErrorBoundary}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigate = () => {
    resetErrorBoundary();
    navigate("/");
  }

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

        <Button
          variant="contained"
          sx={{ marginTop: "2rem" }}
          onClick={handleNavigate}
        >
          Go Home
        </Button>
      </Grid>
    </Container>
  );
};

export default ErrorFallback;
