import { createContext, useContext } from "react";

import { QueueData } from '@interfaces/QueueData';

export interface QueueContextType {
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

export const QueueContext = createContext<QueueContextType | null>(null);

export const useQueueProvider = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueueProvider must be used within a QueueProvider");
  }
  return context;
};