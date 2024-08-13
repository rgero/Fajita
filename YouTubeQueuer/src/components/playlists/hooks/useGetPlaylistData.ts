import { YoutubeResponse } from "../../../interfaces/YoutubeResponse";
import { getPlaylistData } from "../../../services/apiFajita";
import { useQuery } from "@tanstack/react-query"

export interface PlaylistResponse 
{
  isLoading: boolean,
  fetchStatus: string,
  playlistData: YoutubeResponse[] | undefined
}

const targetStaleTime = 1000 * 60 * 60 * 24; // One Day

export const useGetPlaylistData = (playlistId: string): PlaylistResponse => {
  const { isLoading, fetchStatus, data: playlistData } = useQuery({
    queryKey: ["playlistData", playlistId],
    queryFn: () => getPlaylistData(playlistId),
    staleTime: targetStaleTime
  });

  return { isLoading, playlistData, fetchStatus};
}