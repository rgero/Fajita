import { AppBar, Grid, IconButton, Toolbar, Typography, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserAvatar from "../authentication/UserAvatar"

interface Props {
  title: string
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const PageHeader: React.FC<Props> = ({title}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    // We want to go back to the Search Page
    // Ideally retaining what the person had searched before.
    if (location.key === "default")
    {
      navigate('/')
    } else {
      navigate(-1);
    }
  }

  return (
    <AppBar>
      <StyledToolbar>
        <Grid container spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Grid item>
            <Grid container direction="row">
              <Grid item>
                <IconButton onClick={goBack}>
                  <ArrowBackIcon/>
                </IconButton>
              </Grid>
              <Grid item md={4}>
                <Typography variant="h4">{title}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <UserAvatar/>
          </Grid>
        </Grid>
      </StyledToolbar>
    </AppBar>
  )
}

export default PageHeader
