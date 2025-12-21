import { addToQueue, deleteFromQueue, getActiveQueues, getQueue } from '@services/apiFajita';
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Interaction } from '@interfaces/Interaction';
import { Priority } from '@interfaces/Priority';
import { QueueContext } from "./QueueContext";
import { Visibility } from '@interfaces/Visibility';
import { useAuth } from "../authentication/AuthenticationContext";
import { useLocalStorageState } from '@hooks/useLocalStorageState';

export const QueueProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // State
  const [queue, setQueue] = useLocalStorageState("", "queue");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentlySelected, setCurrentlySelected] = useState<Interaction | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Helper: Safely get the ID from the stored JSON string
  const getQueueID = useCallback(() => {
    try {
      const queueObject = JSON.parse(queue);
      return queueObject?.id || "";
    } catch {
      return "";
    }
  }, [queue]);

  useEffect(() => {
    const syncQueueState = async () => {
      try {
        const activeQueues = await getActiveQueues();
        const currentId = getQueueID();

        const currentIsStillActive = activeQueues.find((q: any) => q.id === currentId);

        if (currentIsStillActive) {
          return;
        } else if (activeQueues.length === 1) {
          setQueue(JSON.stringify(activeQueues[0]));
        } else {
          setQueue("");
        }
      } catch (err) {
        console.error("Queue Sync Error:", err);
      } finally {
        setIsInitializing(false);
      }
    };

    if (isAuthenticated) {
      syncQueueState();
    }
  }, [isAuthenticated]);

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
    enabled: isAuthenticated && !isInitializing && getQueueID() !== "",
  });

  const connectToQueue = async (id: string) => {
    const queues = await getActiveQueues();
    const targetQueue = queues.find((obj: { id: string }) => obj.id === id);

    if (!targetQueue) {
      throw new Error("Error connecting to queue");
    }
    setQueue(JSON.stringify(targetQueue));
  };

  const getQueueOwner = () => {
    try {
      const queueObject = JSON.parse(queue);
      return queueObject?.owner?.first_name || "";
    } catch {
      return "";
    }
  };

  const { mutateAsync: addVideoToQueue } = useMutation({
    mutationFn: async ({ id, priority, visibility }: { id: string; priority: Priority; visibility: number }) => {
      if (!user) throw new Error("User not found");
      await addToQueue(getQueueID(), user.id, id, priority, visibility);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queueList"] });
    },
    onError: (err: any) => {
      if (err.response?.status === 403) throw new Error("The Queue is locked");
      throw err;
    }
  });

  const addRandomVideo = async (id: string, priority: number) => {
    if (!user) throw new Error("User not found");
    await addToQueue(getQueueID(), user.id, id, priority, Visibility.Random);
  };

  const checkForPlayNext = () => {
    return (queueData?.next_interaction?.priority || 0) > 1;
  };

  const isInQueue = (id: string) => {
    return queueData?.interactions?.some((i: Interaction) => i.youtube_id === id) || false;
  };

  const getCurrentVideoIndex = () => {
    if (!queueData?.interactions || !queueData?.current_interaction) return -1;
    return queueData.interactions.findIndex((i: Interaction) => i.youtube_id === queueData.current_interaction.youtube_id);
  };

  const getVideoIndexInQueue = (id: string) => {
    return queueData?.interactions?.findIndex((i: Interaction) => i.youtube_id === id) ?? -1;
  };

  const { isPending: isActionPending, mutateAsync: deleteVideoFromQueue } = useMutation({
    mutationFn: (id: string) => deleteFromQueue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queueList"] });
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
        currentlySelected,
        deleteVideoFromQueue,
        error: error as Error | null,
        getCurrentVideoIndex,
        getQueueID,
        getQueueOwner,
        getVideoIndexInQueue,
        isActionPending,
        isConnected: !!queue,
        isInQueue,
        isLoading: isLoading || isInitializing, // Loading while syncing OR fetching
        queueData,
        refetch,
        searchTerm,
        setSearchTerm,
        setCurrentlySelected
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};