import { addToQueue, deleteFromQueue, getActiveQueues, getQueue } from "../services/apiFajita";
import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Interaction } from "../interfaces/Interaction";
import { Priority } from "../interfaces/Priority";
import { QueueData } from "../interfaces/QueueData";
import { Visibility } from "../interfaces/Visibility";
import { useAuth } from "./AuthenicationContext";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface QueueContextType {
  addVideoToQueue: ({id, priority, visibility}: {id: string, priority: number, visibility: number}) => void;
  addRandomVideo: (id:string, priority: number) => void;
  checkForPlayNext: () => boolean,
  connectToQueue: (id: string) => void;
  deleteVideoFromQueue: (id: string) => void;
  isConnected: boolean;
  error: Error | null;
  getQueueID: () => string;
  getQueueOwner: () => string;
  isActionPending: boolean;
  isInQueue: (id: string) => boolean;
  isLoading: boolean;
  queueData: QueueData;
  refetch: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

const QueueProvider = ({ children }: { children: React.ReactNode }) => {
  const [queue, setQueue] = useLocalStorageState("", "queue");
  const {user, isAuthenticated } = useAuth();
  const [ searchTerm, setSearchTerm ] = useState<string>("");
  const queryClient = useQueryClient();

  const getQueueID = () => {
    try {
      const queueObject = JSON.parse(queue);
      return queueObject.id || "";
    } catch {
      return "";
    }
  };

  const { isLoading, data: queueData = {}, error, refetch } = useQuery({
    queryKey: ["queueList", getQueueID()],
    queryFn: async () => {
      try {
        return await getQueue(getQueueID());
      } catch (err: any) {
        if (err.response?.status === 403) {
          throw new Error("Access forbidden: You do not have permission to access this queue.");
        }
        throw err;
      }
    },
    enabled: getQueueID() !== "", // Avoid unnecessary queries
  });

  // Auto-connection logic for queues
  useEffect(() => {
    const checkActiveQueue = async (targetID: number) => {
      const queues = await getActiveQueues();
      const isActive: boolean = queues.some((obj: { id: number }) => obj.id === targetID);
      if (!isActive) {
        setQueue("");
      }
    };

    const tryToConnect = async () => {
      const queues = await getActiveQueues();
      if (queues.length === 1) {
        connectToQueue(queues[0].id);
      } else {
        throw new Error("Cannot auto-connect");
      }
    };

    try {
      const queueObject = JSON.parse(queue);
      if (queueObject.id) {
        checkActiveQueue(queueObject.id);
      } else {
        tryToConnect();
      }
    } catch {
      tryToConnect();
    }
  }, [queue]);

  // Functions to manage the queue
  const connectToQueue = async (id: string) => {
    const queues = await getActiveQueues();
    const targetQueue = queues.find((obj: { id: string; }) => obj.id === id);

    if (!targetQueue) {
      throw new Error("Error connecting to queue");
    }

    setQueue(JSON.stringify(targetQueue));
  };

  const getQueueOwner = () => {
    try {
      const queueObject = JSON.parse(queue);
      return queueObject.owner.first_name || "";
    } catch {
      return "";
    }
  };

  const { mutateAsync: addVideoToQueue } = useMutation({
    mutationFn: async ({ id, priority, visibility }: { id: string; priority: Priority; visibility: number }) => {
      if (!user) { throw new Error("User not found"); }
      await addToQueue(getQueueID(), user.id, id, priority, visibility);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queueList"] });
    },
    onError: (err: any) => {
      if (err.response && err.response.status === 403) {
        throw new Error("The Queue is locked");
      }
      throw err;
    }
  });

  const addRandomVideo = async (id: string, priority: number) => {
    if (!user) { throw new Error("User not found"); }
    await addToQueue(getQueueID(), user.id, id, priority, Visibility.Random);
  }

  const checkForPlayNext = () => {
    if (!queueData.next_interaction) return false;
    if (queueData.next_interaction.priority > 1)
    {
      return true;
    } else {
      return false;
    }
  }

  const isInQueue = (id: string) => {
    if (!queueData.interactions) return false;
    return queueData.interactions.some((interaction: Interaction) => interaction.youtube_id === id);
  }

  const { isPending: isActionPending, mutateAsync: deleteVideoFromQueue } = useMutation({
    mutationFn: (id: string) => deleteFromQueue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queueList"] });
    },
    onError: (err: any) => {
      throw err;
    },
  });

  if (!isAuthenticated) return null;

  return (
    <QueueContext.Provider
      value={{
        addVideoToQueue,
        addRandomVideo,
        checkForPlayNext,
        connectToQueue,
        deleteVideoFromQueue,
        error,
        getQueueID,
        getQueueOwner,
        isActionPending,
        isConnected: !!queue,
        isInQueue,
        isLoading,
        queueData,
        refetch,
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

const useQueueProvider = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueueProvider must be used within a QueueProvider");
  }
  return context;
};

export { QueueProvider, useQueueProvider };
