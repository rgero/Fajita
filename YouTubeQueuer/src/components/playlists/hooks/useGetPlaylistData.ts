import { YoutubeResponse } from "../../../interfaces/YoutubeResponse";
import { getPlaylistData } from "../../../services/apiFajita";
import { useQuery } from "@tanstack/react-query"

export interface PlaylistResponse 
{
  isLoading: boolean,
  fetchStatus: string,
  playlistData: YoutubeResponse[] | undefined
}

export const useGetPlaylistData = (playlistId: string): PlaylistResponse => {
  const { isLoading, fetchStatus, data: playlistData } = useQuery({
    queryKey: ["playlistData", playlistId],
    queryFn: () => getPlaylistData(playlistId),
  });

  return { isLoading, playlistData, fetchStatus};
}