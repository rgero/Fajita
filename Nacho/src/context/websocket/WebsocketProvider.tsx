import { PlaybackState, SocketContext } from "./WebsocketContext";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";
import { notifyQueue, reorderQueue as reorderQueueAPI, setQueueLocked } from "@services/apiFajita";

import InfoToast from "@components/ui/InfoToast";
import { useAuth } from "@context/authentication/AuthenticationContext";
import { useQueryClient } from "@tanstack/react-query";
import { useQueueContext } from "../queue/QueueContext";

interface QueueAck {
  queue_id: string;
}

interface SocketStatus {
  message: string;
}

interface SocketNotification {
  type: string;
  data?: unknown;
}

const getSocketOrigin = (): string => {
  const configuredURL = import.meta.env.VITE_WEBSOCKET_URL || import.meta.env.VITE_BACKEND_URL;
  const absoluteURL = configuredURL.startsWith("//")
    ? `${window.location.protocol}${configuredURL}`
    : /^[a-z][a-z\d+.-]*:\/\//i.test(configuredURL)
      ? configuredURL
      : `${window.location.protocol}//${configuredURL}`;
  return new URL(absoluteURL).origin;
};

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();
  const [isJoined, setIsJoined] = useState(false);
  const { user } = useAuth();
  const { queueData, refetch } = useQueueContext();
  const queryClient = useQueryClient();
  const queueId = queueData.id;

  useEffect(() => {
    setIsJoined(false);
    if (!queueId || !user) {
      setSocket(undefined);
      return;
    }

    let effectIsActive = true;
    let hasJoinedQueue = false;
    const newSocket = io(`${getSocketOrigin()}/player`, {
      withCredentials: true,
      query: { user_name: user.full_name },
    });
    setSocket(newSocket);

    const handleConnect = () => {
      newSocket.emit("join_queue", { queue_id: queueId, user_id: user.id });
    };
    const handleJoinAck = (ack: QueueAck) => {
      if (!effectIsActive || ack?.queue_id !== queueId) return;
      hasJoinedQueue = true;
      setIsJoined(true);
      newSocket.emit("request_playback_state", { queue_id: queueId });
      void refetch();
    };
    const handleDisconnect = () => {
      if (effectIsActive) setIsJoined(false);
    };
    const handleConnectionError = (error: Error) => {
      console.error("WebSocket connection failed:", error);
      InfoToast(`WebSocket connection failed: ${error.message}`);
    };
    const handleStatus = ({ message }: SocketStatus) => {
      InfoToast(message);
    };
    const handleQueueUpdated = () => {
      void refetch();
    };
    const handleLiveQueuesUpdated = (ack: QueueAck) => {
      void queryClient.invalidateQueries({ queryKey: ["liveQueues"] });
      if (ack?.queue_id === queueId) void refetch();
    };
    
    newSocket.on("connect", handleConnect);
    newSocket.on("disconnect", handleDisconnect);
    newSocket.on("connect_error", handleConnectionError);
    newSocket.on("join_ack", handleJoinAck);
    newSocket.on("status", handleStatus);
    newSocket.on("player_progress", (data) => console.log(data));
    newSocket.on("queue_updated", handleQueueUpdated);
    newSocket.on("live_queues_updated", handleLiveQueuesUpdated);
    if (newSocket.connected) handleConnect();

    return () => {
      effectIsActive = false;
      setIsJoined(false);
      newSocket.off("connect", handleConnect);
      newSocket.off("disconnect", handleDisconnect);
      newSocket.off("connect_error", handleConnectionError);
      newSocket.off("join_ack", handleJoinAck);
      newSocket.off("status", handleStatus);
      newSocket.off("queue_updated", handleQueueUpdated);
      newSocket.off("live_queues_updated", handleLiveQueuesUpdated);
      newSocket.off("player_progress", (data) => console.log(data));
      if (!newSocket.connected || !hasJoinedQueue) {
        newSocket.disconnect();
        return;
      }

      const leaveTimer = window.setTimeout(() => {
        console.warn("Timed out waiting for leave_queue acknowledgement");
        newSocket.disconnect();
      }, 2000);
      newSocket.once("leave_ack", (ack: QueueAck) => {
        if (ack?.queue_id !== queueId) return;
        window.clearTimeout(leaveTimer);
        newSocket.disconnect();
      });
      newSocket.emit("leave_queue", { queue_id: queueId });
    };
  }, [queueId, user?.id, user?.full_name, refetch, queryClient]);

  const jumpQueue = useCallback((index: number) => {
    if (socket && isJoined && queueId) {
      socket.emit("play_now", { queue_id: queueId, index });
    }
  }, [socket, isJoined, queueId]);

  const playPause = useCallback((state: PlaybackState) => {
    if (socket && isJoined && queueId) {
      socket.emit("request_play_pause", { queue_id: queueId, state });
    }
  }, [socket, isJoined, queueId]);

  const resetProgress = useCallback(() => {
    if (socket && isJoined && queueId) {
      socket.emit("request_seek", { queue_id: queueId, progress: 0 });
    }
  }, [socket, isJoined, queueId]);

  const reorderQueue = useCallback(async (
    interactionId: string,
    previousInteractionId: string | null,
    nextInteractionId: string | null
  ) => {
    if (!queueId) throw new Error("Not connected to queue");
    await reorderQueueAPI(queueId, interactionId, previousInteractionId, nextInteractionId);
    await refetch();
  }, [queueId, refetch]);

  const skipVideo = useCallback(() => {
    if (!socket || !isJoined || !queueId) return;
    const nextInteraction = queueData.interactions?.find(
      (interaction) => interaction.index > (queueData.current_index ?? -1)
    );
    if (nextInteraction) {
      socket.emit("play_now", { queue_id: queueId, index: nextInteraction.index });
    }
  }, [socket, isJoined, queueId, queueData.current_index, queueData.interactions]);

  const toggleLock = useCallback(async (reason: string) => {
    if (!queueId) throw new Error("Not connected to queue");
    await setQueueLocked(queueId, !queueData.locked);
    await refetch();
    if (reason.trim()) {
      await notifyQueue(queueId, reason.trim());
    }
  }, [queueId, queueData.locked, refetch]);

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

export { SocketProvider };
