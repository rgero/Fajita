import { QueueData } from "../interfaces/QueueData";
import { getQueue } from "../services/apiFajita";
import { useQuery } from "@tanstack/react-query";
import { useQueueProvider } from "../context/QueueContext";

export interface YouTubeQueueResponse
{
  isLoading: boolean,
  queueData: QueueData,
  error: Error | null,
  refetch: () => void
}

export const useYouTubeQueue = (): YouTubeQueueResponse => {
  const {getQueueID} = useQueueProvider();
  const {isLoading, data: queueData = {}, error, refetch} = useQuery({queryKey: ["queueList"], queryFn: ()=> getQueue(getQueueID())});
  return { isLoading, queueData, error, refetch};
}