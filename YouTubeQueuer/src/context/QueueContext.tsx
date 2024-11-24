import { addToQueue, deleteFromQueue, getActiveQueues, getQueue } from "../services/apiFajita";
import { createContext, useContext, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { QueueData } from "../interfaces/QueueData";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useUser } from "../components/authentication/hooks/useUser";

interface QueueContextType {
  isLoading: boolean;
  queueData: QueueData;
  error: Error | null;
  refetch: () => void;
  addVideoToQueue: (id: string, playNext: boolean, selectedVisibility: number) => void;
  connectToQueue: (id: number) => void;
  getQueueID: () => number;
  getQueueOwner: () => string;
  isActionPending: boolean;
  deleteVideoFromQueue: (id: number) => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

const QueueProvider = ({ children }: { children: React.ReactNode }) => {
  const [queue, setQueue] = useLocalStorageState("", "queue");
  const { user, isAuthenticated } = useUser();
  const queryClient = useQueryClient();

  const getQueueID = () => {
    try {
      const queueObject = JSON.parse(queue);
      return queueObject.id || -1;
    } catch {
      return -1;
    }
  };

  const { isLoading, data: queueData = {}, error, refetch } = useQuery({
    queryKey: ["queueList", getQueueID()],
    queryFn: () => getQueue(getQueueID()),
    enabled: getQueueID() !== -1, // Avoid unnecessary queries
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
        toast.error("Cannot auto-connect");
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
  const connectToQueue = async (id: number) => {
    const queues = await getActiveQueues();
    const targetQueue = queues.find((obj: { id: number; }) => obj.id === id);

    if (!targetQueue) {
      toast.error("Error connecting to queue");
      return;
    }

    setQueue(JSON.stringify(targetQueue));
    toast.success("Connected");
  };

  const getQueueOwner = () => {
    try {
      const queueObject = JSON.parse(queue);
      return queueObject.owner.first_name || "";
    } catch {
      return "";
    }
  };

  const addVideoToQueue = (id: string, playNext: boolean, selectedVisibility: number) => {
    try {
      addToQueue(getQueueID(), user?.id as number, id, playNext, selectedVisibility);
      toast.success("Video added");
    } catch {
      toast.error("Error adding video to queue");
    }
  };

  const { isPending: isActionPending, mutate: deleteVideoFromQueue } = useMutation({
    mutationFn: (id: number) => deleteFromQueue(getQueueID(), id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queueList"] });
      toast.success("Video deleted!");
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  if (!isAuthenticated) return null;

  return (
    <QueueContext.Provider
      value={{
        isLoading,
        queueData,
        error,
        refetch,
        addVideoToQueue,
        connectToQueue,
        deleteVideoFromQueue,
        isActionPending,
        getQueueID,
        getQueueOwner,
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
