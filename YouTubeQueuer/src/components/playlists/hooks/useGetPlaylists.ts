import { Playlist } from "../../../interfaces/Playlist";
import { getPlaylists } from "../../../services/apiFajita";
import { useQuery } from "@tanstack/react-query"

export interface PlaylistResponse 
{
  isLoading: boolean,
  fetchStatus: string,
  playlists: Playlist[] | undefined
}

export const useGetPlaylists = (): PlaylistResponse => {
  const { isLoading, fetchStatus, data: playlists } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  return { isLoading, playlists, fetchStatus};
}