import React, { useCallback, useEffect, useMemo, useState } from "react";
import io, { Socket } from 'socket.io-client';

import InfoToast from '@components/ui/InfoToast';
import { SocketContext } from "./WebsocketContext";
import { useQueueContext } from "../queue/QueueContext";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const {queueData, refetch} = useQueueContext();
  const queueId = queueData?.id;

  const initializeSocket = useCallback((params: Record<string, string>) => {
    const newSocket = io(`${import.meta.env.VITE_WEBSOCKET_URL}/player`, {
      withCredentials: true,
      query: params,
    });
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (!queueId) return;

    initializeSocket({ queue_id: queueId });

    return () => {
      setSocket((current) => {
        current?.disconnect();
        return undefined;
      });
    };
  }, [queueId, initializeSocket]);

  const onDataChange = useCallback(async () => {
    refetch();
  }, [refetch]);

  const queueLocked = useCallback(() => {
    InfoToast("Queue is locked");
  }, []);

  const queueUnlocked = useCallback(() => {
    InfoToast("Queue is unlocked");
  }, []);

  const jumpQueue = useCallback((index: number) => {
    if (socket && queueId) {
      socket.emit("set_index", { queue_id: queueId, index });
    }
  }, [socket, queueId]);

  const playPause = useCallback(() => {
    if (socket && queueId) {
      socket.emit("play_pause", { queue_id: queueId });
    }
  }, [socket, queueId]);

  const resetProgress = useCallback(() => {
    if (socket && queueId) {
      socket.emit("set_progress", { queue_id: queueId, progress: 0 });
    }
  }, [socket, queueId]);

  const reorderQueue = useCallback((interactionId: string, prevInteractionId: string | null, nextInteractionId: string | null) => {
    if (socket && queueId) {
      socket.emit("reorder_queue", {
        queue_id: queueId,
        interaction_id: interactionId,
        prev_interaction_id: prevInteractionId,
        next_interaction_id: nextInteractionId,
      });
    }
  }, [socket, queueId]);

  const skipVideo = useCallback(() => {
    if (socket && queueId) {
      socket.emit('skip_video', { queue_id: queueId });
    }
  }, [socket, queueId]);

  const toggleLock = useCallback((reason: string) => {
    if (!socket || !queueId) return;
    if (queueData.locked) {
      socket.emit("unlock_queue", { queue_id: queueId, reason });
    } else {
      socket.emit("lock_queue", { queue_id: queueId, reason });
    }
  }, [socket, queueId, queueData.locked]);

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
  }, [socket, onDataChange, queueLocked, queueUnlocked]);

  const contextValue = useMemo(
    () => ({ socket, jumpQueue, playPause, reorderQueue, resetProgress, skipVideo, toggleLock }),
    [socket, jumpQueue, playPause, reorderQueue, resetProgress, skipVideo, toggleLock]
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
