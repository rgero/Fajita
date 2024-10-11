/* eslint-disable @typescript-eslint/no-unused-vars */

import { addToQueue, deleteFromQueue, getActiveQueues } from "../services/apiFajita";
import { createContext, useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Queue } from "../components/active_queues/hooks/useActiveQueues";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useUser } from "../components/authentication/hooks/useUser";

interface QueueContextType {
  addVideoToQueue: (id: string, playNext: boolean, selectedVisibility: number) => void;
  connectToQueue: (id: number) => void;
  getQueueID: () => number;
  getQueueOwner: () => string;
  isActionPending: boolean;
  deleteVideoFromQueue: (id: number) => void;
}

const QueueContext = createContext<QueueContextType>({
  addVideoToQueue: () => {},
  connectToQueue: (id: number) => { return id},
  getQueueID: () => -1,
  getQueueOwner: () => "",
  isActionPending: false,
  deleteVideoFromQueue: (id: number) => { return id }
})

const QueueProvider = ({children} : {children: React.ReactNode}) => {
  const [queue, setQueue] = useLocalStorageState("", "queue");
  const {user, isAuthenticated} = useUser();
  const queryClient = useQueryClient();

  useEffect( () => {
    /*
      Check the Queue Data
        - If it exists, check to see if Queue ID is still active.
          - Connect if it is active
          - Clear Value if it is not active.
        - If it does not exist, check to see if there is a singular queue open
          - If there is a singular queue, connect to it.
    */
    const checkActiveQueue = async (targetID: number) => {
      const queues = await getActiveQueues();
      const isActive = queues.some( (obj:Queue) => obj.id == targetID );
      if (!isActive)
      {
        setQueue("");
      }
    }

    const tryToConnect = async () => {
      const queues = await getActiveQueues();
      if (queues.length == 1)
      {
        connectToQueue(queues[0].id);
      } else {
        toast.error("Cannot auto-connect");
      }
    }
    
    try {
      const queueObject = JSON.parse(queue);
      if (queueObject.id)
      {
        checkActiveQueue(queueObject.id);
      } else {
        tryToConnect();
      }
    } catch (err)
    {
      tryToConnect();
    }
    
  }, [queue])

  // Functions to Export
  const connectToQueue = async (id: number) => {
    const queues = await getActiveQueues();
    const targetQueue = queues.find( (obj: Queue) => obj.id == id);

    if (!targetQueue)
    {
      toast.error("Error connecting to queue");
      return;
    }

    setQueue(JSON.stringify(targetQueue));
    toast.success("Connected");
  }

  const getQueueID = () : number => {
    try {
      const queueObject = JSON.parse(queue);
      return queueObject.id;
    } catch (err)
    {
      return -1;
    }
  }

  const getQueueOwner = () : string => {
    try {
      const queueObject = JSON.parse(queue);
      return queueObject.owner.first_name;
    } catch (err)
    {
      return "";
    }
  }

  const addVideoToQueue = (id: string, playNext: boolean, selectedVisibility: number) : void => {
    try {
      addToQueue(getQueueID(), user?.id as number, id, playNext, selectedVisibility);
    } catch {
      toast.error("Error adding video to queue");
    }
  }

  const { isPending: isActionPending, mutate: deleteVideoFromQueue } = useMutation({
    mutationFn: (id: number) => deleteFromQueue(getQueueID(), id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queueList"] });
      toast.success("Video deleted!");
    },
    onError: (err: any) => {
      toast.error(err.message);
    }
  });

  if (!isAuthenticated) return;
  return (
    <QueueContext.Provider value={{addVideoToQueue, connectToQueue, deleteVideoFromQueue, isActionPending, getQueueID, getQueueOwner}}>
      {children}
    </QueueContext.Provider>
  )
}

const useQueueProvider = () => {
  const context = useContext(QueueContext);
  if (context === undefined) throw new Error("QueueContext was used outside of QueueProvider");
  return context;
}

export { QueueProvider, useQueueProvider };