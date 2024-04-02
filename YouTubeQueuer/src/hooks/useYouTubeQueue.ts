import { QueueData } from "../interfaces/QueueData";
import { getQueue } from "../services/apiFajita";
import { useQuery } from "@tanstack/react-query";

export interface YouTubeQueueResponse
{
  isLoading: boolean,
  queueData: QueueData,
  error: Error | null,
  refetch: () => void
}

export const useYouTubeQueue = (): YouTubeQueueResponse => {
  const {isLoading, data: queueData = {}, error, refetch} = useQuery({queryKey: ["queueList"], queryFn: ()=>getQueue()});
  return { isLoading, queueData, error, refetch};
}