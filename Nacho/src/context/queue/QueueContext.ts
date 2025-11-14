import { createContext, useContext } from "react";

import { Interaction } from "@interfaces/Interaction";
import { QueueData } from '@interfaces/QueueData';

export interface QueueContextType {
  addVideoToQueue: ({id, priority, visibility}: {id: string, priority: number, visibility: number}) => void;
  addRandomVideo: (id:string, priority: number) => void;
  checkForPlayNext: () => boolean,
  connectToQueue: (id: string) => void;
  currentlySelected: Interaction|null;
  deleteVideoFromQueue: (id: string) => void;
  isConnected: boolean;
  error: Error | null;
  getQueueID: () => string;
  getQueueOwner: () => string;
  getVideoIndexInQueue: (id: string) => number;
  isActionPending: boolean;
  isInQueue: (id: string) => boolean;
  isLoading: boolean;
  queueData: QueueData;
  refetch: () => void;
  searchTerm: string;
  setCurrentlySelected: (int: Interaction) => void;
  setSearchTerm: (term: string) => void;
}

export const QueueContext = createContext<QueueContextType | null>(null);

export const useQueueContext = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueueContext must be used within a QueueProvider");
  }
  return context;
};