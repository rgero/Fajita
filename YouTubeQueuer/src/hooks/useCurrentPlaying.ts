import { YoutubeResponse } from "../interfaces/YoutubeResponse";
import { getCurrentPlaying } from "../services/apiFajita";
import { useQuery } from "@tanstack/react-query";

export const useCurrentPlaying = () => {
  const {isLoading, data: currentlyPlaying, error}: {isLoading: boolean, data: YoutubeResponse|undefined, error: Error|null} = useQuery({queryKey: ["current"], queryFn: () => getCurrentPlaying(), refetchInterval: 5000});
  return { isLoading, currentlyPlaying, error};
}