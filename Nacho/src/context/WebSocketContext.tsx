import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client';

import InfoToast from "../components/ui/InfoToast";
import { useQueueProvider } from "./QueueContext";

interface SocketContextType {
  socket: Socket | undefined,
  jumpQueue: (index: number) => void,
  playPause: () => void,
  skipVideo: () => void,
  toggleLock: () => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const {queueData, refetch} = useQueueProvider();

  const initializeSocket = useCallback((params: Record<string, string>) => {
    const newSocket = io(`${import.meta.env.VITE_WEBSOCKET_URL}/player`, {
      withCredentials: true,
      query: params,
    });
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (!queueData || !queueData.id) return;
    if (socket) {
      socket.disconnect();
    }
    
    initializeSocket({queue_id: queueData.id});
  }, [queueData, initializeSocket]);


  // Websocket events that correspond to the Queue.
  const onDataChange = useCallback( async () => {
    refetch();
  }, [refetch]);

  const queueLocked = () => {
    InfoToast("Queue is locked");
  }

  const queueUnlocked = () => {
    InfoToast("Queue is unlocked");
  }


  const jumpQueue = (index: number) => {
    if (socket) {
      socket.emit("set_index", {queue_id: queueData.id, index: index});
    } 
  }

  const playPause = () => {
    if (socket) {
      socket.emit("play_pause", {queue_id: queueData.id});
    }
  }

  const skipVideo = () => {
    if (socket) {
      socket.emit('skip_video', {queue_id: queueData.id});
    }
  }

  const toggleLock = () => {
    if (!socket) return;
    if (socket && queueData.locked)
    {
      socket.emit("unlock_queue", {queue_id: queueData?.id});
    } else {
      socket.emit("lock_queue", {queue_id: queueData?.id});
    }
  }

  useEffect(() => {
    if (!socket) return;
    socket.on("queue_updated", onDataChange);
    socket.on("queue_locked", queueLocked);
    socket.on("queue_unlocked", queueUnlocked);
    return () => {
      socket.off('queue_updated', onDataChange);
      socket.off("queue_locked", queueLocked);
      socket.off("queue_unlocked", queueUnlocked);
    };
  }, [socket, onDataChange]);

  return (
    <SocketContext.Provider value={
      {
        socket, 
        jumpQueue, 
        playPause,
        skipVideo,
        toggleLock
      }
    }>
      {children}
    </SocketContext.Provider>
  );
};

const useSocketProvider = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketProvider must be used within a SocketProvider');
  }
  return context;
};

export { SocketProvider, useSocketProvider };