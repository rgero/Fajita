import { Container, Grid, Typography } from "@mui/material";

import PageHeader from "../ui/PageHeader";
import PlaylistSelectItem from "./PlaylistSelectItem";
import { useGetPlaylists } from "./hooks/useGetPlaylists"

const PlaylistSelector = ({setPlaylistFn} : {setPlaylistFn: (playlist: string) => void}) => {
  const {isLoading, playlists} = useGetPlaylists();
  
  if (isLoading || !playlists || playlists.length == 0) {return;}
  return (
    <>
      <PageHeader title="Select Playlist"/>
      <Container>
        <Grid container direction="column">
          <Grid item container justifyContent="space-between">
            <Grid item direction="column">
              <Typography>Name</Typography>
            </Grid>
            <Grid item>
              <Typography>Video Count</Typography>
            </Grid>
          </Grid>
          {playlists.map( (item, index) => {
            return (
              <Grid item>
                <PlaylistSelectItem playlist={item} index={index} submitFn={setPlaylistFn}/>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}

export default PlaylistSelector
