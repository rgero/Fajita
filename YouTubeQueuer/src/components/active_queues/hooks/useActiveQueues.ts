import { Interaction } from "../../../interfaces/Interaction";
import { getActiveQueues } from "../../../services/apiFajita";
import { useQuery } from "@tanstack/react-query"

export interface Owner {
  id?:         number;
  email?:      string;
  first_name: string;
  full_name?:  string;
  picture?:    string;
  created_at?: string;
}

export interface Queue {
  interactions:  Interaction[];
  max_index:     number;
  owner:         Owner;
  id:            number;
  active:        boolean;
  locked:        boolean;
  player_sid:    string;
  current_index: number;
  playlist_id:   null;
  created_at:    string;
  modified_at:   string;
}

export interface QueueResponse 
{
  isLoading: boolean,
  fetchStatus: string,
  queues: Queue[] | undefined
}

export const useActiveQueues = (): QueueResponse => {
  const { isLoading, fetchStatus, data: queues } = useQuery({
    queryKey: ["activeQueues"],
    queryFn: getActiveQueues,
  });
  return { isLoading, queues, fetchStatus};
}