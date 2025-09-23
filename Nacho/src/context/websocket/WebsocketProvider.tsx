import React, { useCallback, useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client';

import InfoToast from "../../components/ui/InfoToast";
import { SocketContext } from "./WebsocketContext";
import { useQueueProvider } from "../queue/QueueContext";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
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

  const toggleLock = (reason: string) => {
    if (!socket) return;
    if (socket && queueData.locked)
    {
      socket.emit("unlock_queue", {queue_id: queueData?.id, reason: reason});
    } else {
      socket.emit("lock_queue", {queue_id: queueData?.id, reason: reason});
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