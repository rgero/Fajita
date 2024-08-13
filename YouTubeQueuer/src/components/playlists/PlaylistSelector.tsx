import { Container, Grid, Typography } from "@mui/material";

import PlaylistSelectItem from "./PlaylistSelectItem";
import Spinner from "../ui/Spinner";
import { useGetPlaylists } from "./hooks/useGetPlaylists"

const PlaylistSelector = () => {
  const {isLoading, playlists} = useGetPlaylists();

  if (isLoading) return (<Spinner/>)
  
  if (!playlists || playlists.length == 0) {
    return (<Typography>No Playlists found?</Typography>)
  }
  
  return (
    <>
      <Container>
        <Grid container direction="column">
          <Grid item container justifyContent="space-between">
            <Grid item>
              <Typography>Name</Typography>
            </Grid>
            <Grid item>
              <Typography>Video Count</Typography>
            </Grid>
          </Grid>
          {playlists.map( (item, index) => {
            return (
              <Grid key={index} item>
                <PlaylistSelectItem playlist={item} index={index}/>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}

export default PlaylistSelector
