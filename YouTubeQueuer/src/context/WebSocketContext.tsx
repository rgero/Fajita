import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client';

import { useQueueProvider } from "./QueueContext";

interface SocketContextType {
  socket: Socket
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const {queueData} = useQueueProvider();

  const initializeSocket = useCallback((params: Record<string, number>) => {
    const newSocket = io(`${import.meta.env.VITE_WEBSOCKET_URL}/player`, {
      withCredentials: true,
      query: params,
    });
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.disconnect();
    }

    console.log(queueData.id);

    initializeSocket({queue_id: queueData.id});
  }, [queueData, initializeSocket]);

  return (
    <SocketContext.Provider value={{socket}}>
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