import { QueueData } from "@interfaces/QueueData";
import { getLiveQueues } from "@services/apiFajita";
import { useQuery } from "@tanstack/react-query"

export interface QueueResponse 
{
  isLoading: boolean,
  fetchStatus: string,
  queues: QueueData[] | undefined
}

export const useActiveQueues = (): QueueResponse => {
  const { isLoading, fetchStatus, data: queues } = useQuery({
    queryKey: ["liveQueues"],
    queryFn: getLiveQueues,
  });
  return { isLoading, queues, fetchStatus};
}