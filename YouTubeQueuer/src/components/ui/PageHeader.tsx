import { AppBar, Grid, IconButton, Toolbar, Typography, styled, useMediaQuery } from "@mui/material";
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
  const matchesXS = useMediaQuery('(max-width:375px)');

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
    <AppBar sx={{zIndex: 10}}>
      <StyledToolbar>
        <Grid container spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Grid item>
            <Grid container direction="row">
              <Grid item>
                <IconButton size={matchesXS ? "small" : "medium"}onClick={goBack}>
                  <ArrowBackIcon/>
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant={matchesXS ? "h5" : "h4"}>{title}</Typography>
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
