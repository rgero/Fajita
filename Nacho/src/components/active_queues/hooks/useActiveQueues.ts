import { QueueData } from "../../../interfaces/QueueData";
import { getActiveQueues } from "../../../services/apiFajita";
import { useQuery } from "@tanstack/react-query"

export interface QueueResponse 
{
  isLoading: boolean,
  fetchStatus: string,
  queues: QueueData[] | undefined
}

export const useActiveQueues = (): QueueResponse => {
  const { isLoading, fetchStatus, data: queues } = useQuery({
    queryKey: ["activeQueues"],
    queryFn: getActiveQueues,
  });
  return { isLoading, queues, fetchStatus};
}