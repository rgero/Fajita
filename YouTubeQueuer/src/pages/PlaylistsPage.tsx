import { Container, CssBaseline } from "@mui/material"

import PlaylistPresentation from '../components/playlists/PlaylistPresentation';

const PlaylistsPage = () => {
  return (
    <>
      <CssBaseline/>
      <Container disableGutters sx={{width: {xs: "100%", md:"40%"}, marginTop: "5.5rem"}}>
        <PlaylistPresentation/>
      </Container>
    </>

  )
}

export default PlaylistsPage
