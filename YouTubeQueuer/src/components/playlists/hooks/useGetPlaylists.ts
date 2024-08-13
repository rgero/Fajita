import { Playlist } from "../../../interfaces/Playlist";
import { getPlaylists } from "../../../services/apiFajita";
import { useQuery } from "@tanstack/react-query"

export interface PlaylistResponse 
{
  isLoading: boolean,
  fetchStatus: string,
  playlists: Playlist[] | undefined
}

const targetStaleTime = 1000 * 60 * 60 * 24; // One Day

export const useGetPlaylists = (): PlaylistResponse => {
  const { isLoading, fetchStatus, data: playlists } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
    staleTime: targetStaleTime
  });

  return { isLoading, playlists, fetchStatus};
}