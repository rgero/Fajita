import { getQueue } from "../services/apiFajita";
import { useQuery } from "@tanstack/react-query";

export const useYouTubeQueue = () => {
  const {isLoading, data: queueData = {}, error, refetch} = useQuery({queryKey: ["queueList"], queryFn: ()=>getQueue()});
  return { isLoading, queueData, error, refetch};
}