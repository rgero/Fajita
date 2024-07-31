import PageHeader from "../ui/PageHeader";
import PlaylistSelectItem from "./PlaylistSelectItem";
import { useGetPlaylists } from "./hooks/useGetPlaylists"

const PlaylistSelector = ({setPlaylistFn} : {setPlaylistFn: (playlist: string) => void}) => {
  const {isLoading, playlists} = useGetPlaylists();
  
  if (isLoading || !playlists || playlists.length == 0) {return;}
  return (
    <>
      <PageHeader title="Select Playlist"/>
      {playlists.map( (item) => {
        return (
          <PlaylistSelectItem playlist={item} submitFn={setPlaylistFn}/>
        )
      })}
    </>
  )
}

export default PlaylistSelector
